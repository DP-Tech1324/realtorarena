
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Access Supabase credentials from environment variables
// When deployed through Lovable's Supabase integration, these will be available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// For local development or if environment variables aren't available yet,
// we use fallbacks that will work for testing forms
const fallbackUrl = 'https://xyzcompany.supabase.co';
const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtYXB6YXV5dml5b2NseXl4bGN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODU5NzMwMDEsImV4cCI6MjAwMTU0OTAwMX0.0DzlJ4GaGUAYh_pV6w4xrUXgzl3aZB-TwWH-xgK0z3o';

// Use environment variables if available, otherwise use fallbacks
const url = supabaseUrl || fallbackUrl;
const key = supabaseAnonKey || fallbackKey;

// In production, we want to ensure environment variables are properly set
if (import.meta.env.PROD && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn('Production environment missing Supabase credentials. Using fallbacks.');
}

export const supabase = createClient<Database>(url, key);
