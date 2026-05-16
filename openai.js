import { openai, supabase } from './config.js';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { promises as fs } from 'fs';
import path, { format } from 'path';
import { schemaResponse } from './schema-response.js';
import { text } from 'stream/consumers';

async function splitDocument() {
  const text = await getMovies();
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 25,
  });
  const output = await splitter.createDocuments([text]);
  return output;
}

export async function createAndStoreEmbeddings() {
  const chunkData = await splitDocument();
  const data = await Promise.all(
    chunkData.map(async (chunk) => {
      const embeddingResponse = await openai.embeddings.create({
        model: process.env.AI_Embedding_MODEL,
        input: chunk.pageContent
      });
      return {  
        content: chunk.pageContent, 
        embedding: embeddingResponse.data[0].embedding 
      }
    })
  );
  await supabase.from('movies').insert(data);
  console.log('Embeddings created and stored successfully!', data);
  console.log('SUCCESS!');
}

async function getMovies() {
  const filePath = path.join(process.cwd(), 'movies.txt');
  const data = await fs.readFile(filePath, 'utf8');
  return data;
}
// createAndStoreEmbeddings();

export async function getRecommendation(prompt) {
  const response = await openai.responses.create({
    model: process.env.AI_MODEL,
    instructions: "Based on the user data and watch length, recommend a movie or TV series. Return the recommendation in the following JSON format: { title: string, description: string }",
    input: prompt,
  });
  console.log("OpenAI response:", response);
  return response.output_text;
}