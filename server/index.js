const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { OpenAI } = require("openai"); // ✅ correct for openai@4.x+

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 🔐 from .env file
});

app.post("/api/suggest", async (req, res) => {
  const { interests } = req.body;

  const prompt = `Suggest 3 personalized career paths and potential college majors for someone who says: "${interests}". Include a short explanation for each.`;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    res.json({ suggestion: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Failed to get suggestions." });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
