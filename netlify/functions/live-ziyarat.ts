import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "YOUTUBE_API_KEY is not set" }),
      };
    }

    const query = encodeURIComponent("Makkah live OR Madinah live");
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&eventType=live&maxResults=4&key=${apiKey}`
    );
    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify(data),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch live streams" }),
    };
  }
};
