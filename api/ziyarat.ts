import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'application/json');
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "YOUTUBE_API_KEY is not set" });
    }

    // Search for live streams for Makkah and Madinah with a broader query
    const query = encodeURIComponent("Makkah Live OR Madinah Live");
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&eventType=live&maxResults=5&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({ error: "YouTube API Error", details: data });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch live streams" });
  }
}
