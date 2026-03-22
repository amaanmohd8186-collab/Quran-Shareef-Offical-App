import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/live-ziyarat", async (req, res) => {
    try {
      const apiKey = process.env.YOUTUBE_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "YOUTUBE_API_KEY is not set" });
      }

      // Search for live streams for Makkah and Madinah with a broader query
      const query = encodeURIComponent("Makkah Live OR Madinah Live");
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&eventType=live&maxResults=5&key=${apiKey}`;
      console.log("Fetching from YouTube API:", url);
      const response = await fetch(url);
      const data = await response.json();
      
      if (!response.ok) {
        console.error("YouTube API Error Response:", JSON.stringify(data, null, 2));
        return res.status(response.status).json({ error: "YouTube API Error", details: data });
      }

      console.log("YouTube API Success. Items count:", data.items?.length);
      res.json(data);
    } catch (error) {
      console.error("Error fetching live streams:", error);
      res.status(500).json({ error: "Failed to fetch live streams" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
