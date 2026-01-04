import { NextRequest, NextResponse } from 'next/server';

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

    // Format messages for Claude API
    const formattedMessages = messages
      .filter((msg: { role: string; content: string }) => msg.role !== 'system')
      .map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: typeof msg.content === 'string' ? msg.content : String(msg.content),
      }));

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1024,
        messages: formattedMessages,
        system: `You are Max, a friendly and knowledgeable sustainability guide for CarbonMax, a gamified carbon reduction platform at Changi Airport in Singapore. 

Your role is to help users:
- Find the best sustainability quests for their journey
- Understand carbon facts and sustainable aviation fuel (SAF)
- Discover green merchants and restaurants at Changi Airport
- Learn about the Green Tier system and how to earn Eco-Points

Keep responses concise, friendly, and helpful. Use emojis sparingly but appropriately. When relevant, mention specific quests, points, tiers, or locations at Changi Airport.`,
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
