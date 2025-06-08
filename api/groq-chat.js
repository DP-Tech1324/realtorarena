// /api/groq-chat.js
import { groq } from '@ai-sdk/groq';
import { streamText } from 'ai';

export const maxDuration = 30; // seconds

export default async function handler(req, res) {
  const { messages } = req.body;

  const textStream = await streamText({
    model: groq('llama-3-8b-8192'), // Replace with your preferred/available model
    messages,
  });

  textStream.toNodeResponse(res);
}