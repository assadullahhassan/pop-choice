import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import ws from 'ws';
// import { createClient } from "https://esm.sh/@supabase/supabase-js";

/** OpenAI config */
console.log("OpenAI API key:", process.env.OPENAI_API_KEY);
if (!process.env.OPENAI_API_KEY) throw new Error("OpenAI API key is missing or invalid.");
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.AI_URL,
  dangerouslyAllowBrowser: true
});

/** Supabase config */
const privateKey = process.env.SUPABASE_API_KEY;
if (!privateKey) throw new Error(`Expected env var SUPABASE_API_KEY`);
const url = process.env.SUPABASE_URL;
if (!url) throw new Error(`Expected env var SUPABASE_URL`);
export const supabase = createClient(url, privateKey, {
  realtime: {
    transport: ws,
  },
});

