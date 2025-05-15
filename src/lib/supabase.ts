
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Access Supabase credentials from environment variables
// When deployed through Lovable's Supabase integration, these will be available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// For local development or if environment variables aren't available yet,
// we can use fallback values (these should be replaced with your actual Supabase project values)
const fallbackUrl = 'https://your-supabase-project-id.supabase.co';
const fallbackKey = 'your-public-anon-key';

// Use environment variables if available, otherwise use fallbacks
const url = supabaseUrl || fallbackUrl;
const key = supabaseAnonKey || fallbackKey;

// In production, we want to ensure environment variables are properly set
if (import.meta.env.PROD && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn('Production environment missing Supabase credentials. Using fallbacks.');
}

export const supabase = createClient<Database>(url, key);
