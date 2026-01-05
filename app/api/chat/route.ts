import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export const runtime = 'nodejs';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function GET() {
  return NextResponse.json({ status: 'Chat API is running' });
}

// Helper function to load JSON data
async function loadDataFiles() {
  try {
    const dataDir = join(process.cwd(), 'data', 'emissions');
    
    const [dailyEmissions, hourlyActivity, aiInsights, airlines, aircraftTypes, tenants] = await Promise.all([
      readFile(join(dataDir, 'daily-emissions.json'), 'utf-8').then(JSON.parse).catch(() => null),
      readFile(join(dataDir, 'carbonmax-hourly.json'), 'utf-8').then(JSON.parse).catch(() => null),
      readFile(join(dataDir, 'ai-insights.json'), 'utf-8').then(JSON.parse).catch(() => null),
      readFile(join(dataDir, 'airlines.json'), 'utf-8').then(JSON.parse).catch(() => null),
      readFile(join(dataDir, 'aircraft-types.json'), 'utf-8').then(JSON.parse).catch(() => null),
      readFile(join(dataDir, 'tenants.json'), 'utf-8').then(JSON.parse).catch(() => null),
    ]);

    return {
      dailyEmissions,
      hourlyActivity,
      aiInsights,
      airlines,
      aircraftTypes,
      tenants,
    };
  } catch (error) {
    console.error('Error loading data files:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const apiKey = process.env.CLAUDE_API_KEY;
    
    if (!apiKey) {
      console.error('CLAUDE_API_KEY is not set');
      return NextResponse.json(
        { error: 'Claude API key is not configured' },
        { status: 500 }
      );
    }

    // Load JSON data files
    const dataFiles = await loadDataFiles();
    
    // Build system prompt with data context
    let systemPrompt = `You are Max, an AI assistant for the CarbonMax Operations Dashboard at Changi Airport in Singapore. You help operations staff understand emissions data, trends, forecasts, and sustainability insights.

Your role is to answer questions about:
- Daily emissions data (Scope 1, 2, 3 breakdowns, trends, comparisons)
- Hourly CarbonMax activity (quest completions, CO2 avoided, user engagement)
- AI-generated insights and forecasts
- Airline performance and efficiency metrics
- Aircraft type efficiency comparisons
- Tenant sustainability ratings and performance
- Emission trends, anomalies, and opportunities

IMPORTANT: Use the provided data to answer questions accurately. Reference specific dates, numbers, and metrics from the data when relevant. If asked about trends, compare data points. If asked about forecasts, reference the forecast data provided.

Keep responses clear, data-driven, and professional. Use specific numbers and dates when available.`;

    // Add data context to system prompt if data is loaded
    if (dataFiles) {
      // Create a summary of key data points for context
      const dataSummary = {
        dailyEmissions: dataFiles.dailyEmissions ? {
          period: dataFiles.dailyEmissions.metadata?.period,
          latestDate: dataFiles.dailyEmissions.dailyEmissions?.[dataFiles.dailyEmissions.dailyEmissions.length - 1]?.date,
          latestTotal: dataFiles.dailyEmissions.dailyEmissions?.[dataFiles.dailyEmissions.dailyEmissions.length - 1]?.totalEmissions,
          baseline: dataFiles.dailyEmissions.metadata?.baseline,
          recentTrends: dataFiles.dailyEmissions.dailyEmissions?.slice(-7).map((d: any) => ({
            date: d.date,
            total: d.totalEmissions,
            vsLastWeek: d.vsLastWeek,
            flights: d.operationalData?.flights,
          })),
        } : null,
        hourlyActivity: dataFiles.hourlyActivity ? {
          date: dataFiles.hourlyActivity.summary?.date,
          totalQuests: dataFiles.hourlyActivity.summary?.totalQuestsCompleted,
          totalCO2Avoided: dataFiles.hourlyActivity.summary?.totalCO2Avoided,
          peakHour: dataFiles.hourlyActivity.summary?.peakHour,
        } : null,
        aiInsights: dataFiles.aiInsights ? {
          todayInsight: dataFiles.aiInsights.todayInsight,
          insights: dataFiles.aiInsights.insights?.slice(0, 5), // Top 5 insights
          forecast: dataFiles.aiInsights.forecast,
        } : null,
        airlines: dataFiles.airlines ? {
          totalAirlines: dataFiles.airlines.summary?.totalAirlines,
          topAirlines: dataFiles.airlines.airlines?.slice(0, 10).map((a: any) => ({
            name: a.airlineName,
            code: a.airlineCode,
            emissions: a.totalEmissions,
            rating: a.performance?.rating,
            trend: a.trend,
          })),
        } : null,
        aircraftTypes: dataFiles.aircraftTypes ? {
          mostEfficient: dataFiles.aircraftTypes.summary?.mostEfficientType,
          topTypes: dataFiles.aircraftTypes.aircraftTypes?.slice(0, 10).map((a: any) => ({
            type: a.aircraftType,
            efficiencyScore: a.efficiencyScore,
            co2PerPax: a.co2PerPax,
          })),
        } : null,
        tenants: dataFiles.tenants ? {
          totalTenants: dataFiles.tenants.summary?.totalTenants,
          topTenants: dataFiles.tenants.tenants?.slice(0, 10).map((t: any) => ({
            name: t.name,
            rating: t.rating,
            emissions: t.emissions,
            category: t.category,
          })),
        } : null,
      };

      systemPrompt += `\n\nDATA CONTEXT:\n${JSON.stringify(dataSummary, null, 2)}\n\nWhen answering questions, reference this data. For detailed queries, you have access to the full datasets which include:\n- 30 days of daily emissions data with scope breakdowns\n- Hourly CarbonMax activity patterns\n- AI insights with forecasts and recommendations\n- Complete airline and aircraft type performance data\n- Tenant sustainability ratings and metrics`;
    }

    // Format messages for Claude API
    const formattedMessages = messages
      .filter((msg: { role: string; content: string }) => msg.role !== 'system')
      .map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: typeof msg.content === 'string' ? msg.content : String(msg.content),
      }));

    // Call Claude API with increased max_tokens for data analysis
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 2048,
        messages: formattedMessages,
        system: systemPrompt,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Claude API error:', response.status, errorData);
      return NextResponse.json(
        { error: 'Failed to get response from Claude API', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || 'Sorry, I could not generate a response.';

    return NextResponse.json({ content });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
