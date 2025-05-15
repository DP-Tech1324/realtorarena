
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Access Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are available
if (import.meta.env.PROD && (!supabaseUrl || !supabaseAnonKey)) {
  throw new Error('Missing Supabase environment variables');
}

// Fallback values for development/testing only
const fallbackUrl = 'https://xyzcompany.supabase.co';
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtYXB6YXV5dml5b2NseXl4bGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5NzMwMDEsImV4cCI6MjAwMTU0OTAwMX0.0DzlJ4GaGUAYh_pV6w4xrUXgzl3aZB-TwWH-xgK0z3o';

// Use environment variables if available, otherwise use fallbacks
const url = supabaseUrl || fallbackUrl;
const key = supabaseAnonKey || fallbackKey;

export const supabase = createClient<Database>(url, key);

console.log('Supabase client created with URL:', url);
