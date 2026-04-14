import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { surahNum, ayahNum, text, translation } = JSON.parse(event.body || "{}");

    if (!surahNum || !ayahNum) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing parameters" }) };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tafsir: "Online AI Tafseer is currently disabled. Please use the English Tafseer option for detailed explanations." }),
    };
  } catch (error) {
    console.error("Tafseer error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate Tafseer" }),
    };
  }
};
