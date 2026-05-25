import express from "express";
import cors from "cors";
import 'dotenv/config';
import { createAndStoreEmbeddings, getRecommendation } from "./openai.js";
import http from 'http';
import { stringify } from "querystring";

if (!process.env.TMDB_BEARER_TOKEN) {
  throw new Error("TMDB_BEARER_TOKEN environment variable is not set.");
}

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/recommendation", async (req, res) => {
  try {
    const { userData, watchLength, oldRecommendation } = req.body;
    console.log("Received user data:", userData);
    console.log("Received watch length:", watchLength);
    console.log("Received old recommendation:", oldRecommendation);

    const prompt = `User data: ${JSON.stringify(userData)}, Watch length: ${watchLength}, Old recommendation: ${JSON.stringify(oldRecommendation)}`;

    const recommendation = await getRecommendation(prompt);
    console.log("Generated recommendation from OpenAI:", recommendation);
    res.json(recommendation);
  } catch (error) {
    console.error("Error generating recommendation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// await createAndStoreEmbeddings();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});