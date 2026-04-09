import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  try {
    // Providing static link to makkahlive.net
    const data = {
      items: [
        {
          id: { videoId: 'makkah-live' },
          snippet: { 
            title: 'Makkah Live - Masjid al-Haram',
            description: 'Live stream from Masjid al-Haram, Makkah.'
          },
          url: 'https://www.makkahlive.net/'
        }
      ]
    };

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch live streams" }),
    };
  }
};
