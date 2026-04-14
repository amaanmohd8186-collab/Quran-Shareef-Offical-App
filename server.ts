import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // API routes
  app.get("/.netlify/functions/live-ziyarat", async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
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
      res.json(data);
    } catch (error) {
      console.error("Error providing live streams:", error);
      res.status(500).json({ error: "Failed to provide live streams" });
    }
  });

  app.post("/.netlify/functions/tafseer", async (req, res) => {
    try {
      res.json({ tafsir: "Online AI Tafseer is currently disabled. Please use the English Tafseer option for detailed explanations." });
    } catch (error) {
      console.error("Tafseer error:", error);
      res.status(500).json({ error: "Failed to provide Tafseer" });
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
