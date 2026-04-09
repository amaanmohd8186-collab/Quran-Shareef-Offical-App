import { Handler } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { surahNum, ayahNum, text, translation } = JSON.parse(event.body || "{}");

    if (!surahNum || !ayahNum) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing parameters" }) };
    }

    if (!process.env.GEMINI_API_KEY) {
      return { statusCode: 500, body: JSON.stringify({ error: "GEMINI_API_KEY is not set in the environment variables." }) };
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `Provide a short, easy-to-understand Tafsir (explanation) in Hindi for Surah ${surahNum}, Ayah ${ayahNum} of the Quran.
        
Arabic: ${text}
Translation: ${translation}

Format the response in clean HTML using <p>, <strong>, and <ul> tags. Do not use markdown backticks. Make it very fast and concise.`;

    const model = ai.getGenerativeModel({ model: "gemini-3-flash-preview" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const tafsirText = response.text().replace(/```/g, '');

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tafsir: tafsirText }),
    };
  } catch (error) {
    console.error("Tafseer error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate Tafseer" }),
    };
  }
};
