import { openai, supabase } from './config.js';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { promises as fs } from 'fs';
import path from 'path';

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
        model: "text-embedding-3-small",
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