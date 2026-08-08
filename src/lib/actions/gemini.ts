"use server";

import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "dummy-key-for-build",
});

export async function getAIEncouragement(category: string, answer: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    // Fallback for development if no key is provided
    return `I noted your response about ${category}. We'll work on that together!`;
  }

  const prompt = `
You are the AI Mentor for "SYLVA-eCO LIFE", an engaging sustainability platform.
The user just answered a question about their ${category}. 
Their answer was: "${answer}".

Respond in 1-2 short sentences. Be incredibly encouraging, friendly, and non-judgmental.
If they do something good (e.g., using a bicycle, short showers), praise them.
If they do something bad (e.g., using a lot of plastic, driving a car everywhere), be uplifting and say you'll help them improve without guilt-tripping.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5",
      contents: prompt,
    });
    return response.text || "I'm excited to help you on this journey!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Thanks for sharing! We will incorporate this into your Eco DNA.";
  }
}

export async function getGeminiResponse(prompt: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    return "Here is a mock response from the Recycling AI. You should recycle this by...";
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5",
      contents: prompt,
    });
    return response.text || "I'm not sure, but recycling is always a good idea!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am having trouble connecting right now.";
  }
}
