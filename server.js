import express from "express";
import cors from "cors";
import 'dotenv/config';
import { openai, supabase } from "./config.js";
import { createAndStoreEmbeddings } from "./chunking.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/recommendation", async (req, res) => {
  try {
    const { userData, watchLength } = req.body;
    console.log("Received user data:", userData);
    console.log("Received watch length:", watchLength);
    const recommendation = {
      title: "The Shawshank Redemption",
      description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
    };

    res.json(recommendation);
  } catch (error) {
    console.error("Error generating recommendation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

await createAndStoreEmbeddings();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});