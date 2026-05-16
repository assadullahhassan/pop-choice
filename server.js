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
    const { userData, watchLength } = req.body;
    console.log("Received user data:", userData);
    console.log("Received watch length:", watchLength);

    const prompt = `User data: ${JSON.stringify(userData)}, Watch length: ${watchLength}`;

    const recommendation = await getRecommendation(prompt);
    console.log("Generated recommendation from OpenAI:", recommendation);
    res.json(recommendation);
  } catch (error) {
    console.error("Error generating recommendation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get("/api/poster",  (req, res) => {
//       // const tvSeriesId = 4614;
//       const tvSeriesIdRaw = req.query.tvSeriesId;
//       const tvSeriesId = Number(tvSeriesIdRaw);
//       if (!tvSeriesIdRaw || isNaN(tvSeriesId) || tvSeriesId <= 0) {
//         return res.status(400).json({ error: "Invalid or missing tvSeriesId parameter" });
//       }
//       console.log("Received TV series ID:", tvSeriesId);
//       const options = {
//       method: 'GET',
//       hostname: 'api.themoviedb.org',
//       Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
//       path: `/3/tv/${tvSeriesId}/images`,
//       headers: {
//         accept: 'application/json',
//         Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`
//       }
//     };

//      req = http.request(options, function (res) {
//     const chunks = [];

//     res.on('data', function (chunk) {
//       chunks.push(chunk);
//     });

//     res.on('end', function () {
//       const body = Buffer.concat(chunks);
//       console.log(body.toString());
//     });
//   });
//   req.end();
// });

// await createAndStoreEmbeddings();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});