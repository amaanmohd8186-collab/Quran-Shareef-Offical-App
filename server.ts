import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // API routes
  app.get("/api/live-ziyarat", async (req, res) => {
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

  app.post("/api/tafseer", async (req, res) => {
    try {
      const { surahNum, ayahNum, text, translation } = req.body;
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const prompt = `Provide a short, easy-to-understand Tafsir (explanation) in Hindi for Surah ${surahNum}, Ayah ${ayahNum} of the Quran.
          
Arabic: ${text}
Translation: ${translation}

Format the response in clean HTML using <p>, <strong>, and <ul> tags. Do not use markdown backticks. Make it very fast and concise.`;

      const model = ai.getGenerativeModel({ model: "gemini-3-flash-preview" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const tafsirText = response.text().replace(/```/g, '');

      res.json({ tafsir: tafsirText });
    } catch (error) {
      console.error("Tafseer error:", error);
      res.status(500).json({ error: "Failed to generate Tafseer" });
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
