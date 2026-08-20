import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OpenAI from "openai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json({ limit: "12mb" }));
app.use(express.static(path.join(__dirname, "public")));

const toneInstructions = {
  caliente: "coqueto y atrevido, con tensión romántica ligera; no vulgar ni explícito",
  enamorar: "tierno, romántico, genuino y con interés real; sin exagerar",
  chistoso: "divertido, natural y con humor; que facilite seguir la conversación",
  salvar: "rescata una conversación fría o estancada; cambia el ritmo con una pregunta o comentario natural",
  seguro: "directo, confiado, respetuoso y natural; sin sonar arrogante"
};

app.post("/api/reply", async (req, res) => {
  try {
    const { image, tone } = req.body || {};

    if (!image || typeof image !== "string" || !image.startsWith("data:image/")) {
      return res.status(400).json({ error: "Falta una imagen válida." });
    }
    if (!toneInstructions[tone]) {
      return res.status(400).json({ error: "Tono no válido." });
    }
    if (image.length > 10_000_000) {
      return res.status(413).json({ error: "La imagen es demasiado grande." });
    }

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      input: [{
        role: "user",
        content: [
          {
            type: "input_text",
            text:
`Analiza esta captura de una conversación y entiende el contexto. Genera exactamente 3 posibles respuestas en español.
Tono elegido: ${toneInstructions[tone]}.
Reglas:
- Responde como una persona real, no como un asistente.
- Mantén las respuestas breves y naturales.
- No inventes información que no aparezca en la captura.
- No menciones que eres IA.
- Si el texto no se puede leer con suficiente claridad, dilo en una de las respuestas y pide que escriban el último mensaje.
- Devuelve SOLO un JSON válido con esta forma: {"responses":["...","...","..."]}` 
          },
          { type: "input_image", image_url: image }
        ]
      }]
    });

    const raw = response.output_text?.trim() || "";
    let parsed;
    try { parsed = JSON.parse(raw); } catch {
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
    }

    if (!parsed?.responses || !Array.isArray(parsed.responses)) {
      return res.status(502).json({ error: "La IA devolvió un formato inesperado." });
    }

    res.json({ responses: parsed.responses.slice(0, 3).map(String) });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "No se pudo contactar con la IA. Revisa la clave de API y vuelve a intentar."
    });
  }
});

app.listen(port, () => {
  console.log(`ReplyMate AI: http://localhost:${port}`);
});
