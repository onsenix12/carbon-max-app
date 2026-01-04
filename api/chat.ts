import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Handle CORS
  if (request.method === 'OPTIONS') {
    return response.status(200).json({});
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = request.body;

    const apiKey = process.env.CLAUDE_API_KEY;
    
    if (!apiKey) {
      return response.status(500).json({
        error: 'Claude API key is not configured'
      });
    }

    // Format messages for Claude API
    const formattedMessages = messages
      .filter((msg: { role: string; content: string }) => msg.role !== 'system')
      .map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: typeof msg.content === 'string' ? msg.content : String(msg.content),
      }));

    // Call Claude API
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2024-10-22',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
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

    if (!claudeResponse.ok) {
      const errorData = await claudeResponse.text();
      console.error('Claude API error:', errorData);
      return response.status(claudeResponse.status).json({
        error: 'Failed to get response from Claude API',
        details: errorData
      });
    }

    const data = await claudeResponse.json();
    
    // Extract the text content from Claude's response
    const content = data.content?.[0]?.text || 'Sorry, I could not generate a response.';

    // Set CORS headers
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    return response.status(200).json({ content });
  } catch (error) {
    console.error('Chat API error:', error);
    return response.status(500).json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

