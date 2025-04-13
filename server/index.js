const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/suggest", async (req, res) => {
  const { interests } = req.body;

  const prompt = `Suggest 3 personalized career paths and potential college majors for someone who says: "${interests}". Include a short explanation for each.`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // or "gemini-pro", etc.

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ suggestion: text });
  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ error: "Failed to get suggestions." });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
