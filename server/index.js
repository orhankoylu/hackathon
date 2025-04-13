const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();
app.use(cors()); // ✅ Enables CORS
app.use(express.json()); // ✅ Parses JSON requests

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/suggest", async (req, res) => {
  const { interests } = req.body;

  const prompt = `Suggest 3 personalized career paths and potential college majors for someone who says: "${interests}". Include a short explanation for each.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ suggestion: text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to get suggestions." });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
