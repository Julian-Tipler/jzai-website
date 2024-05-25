// supabaseClient.js
import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database.types";

const supabaseUrl: string = (import.meta.env.VITE_PRODUCTION_SUPABASE_URL ||
  "") as string;
const supabaseAnonKey: string = (import.meta.env
  .VITE_PRODUCTION_SUPABASE_ANON_TOKEN || "") as string;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
