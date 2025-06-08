// /api/groq-chat.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  try {
    const { messages } = req.body;
    const apiKey = process.env.GROQ_API_KEY;

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3-70b-instruct', // Fastest, you can change to Mixtral or others
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful real estate assistant for RealtorJigar. Help users with property listings, mortgage calculations, and general real estate questions. Keep responses concise and professional.' 
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 150,
      }),
    });

    const data = await groqRes.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Groq error', detail: err?.message || err });
  }
}
