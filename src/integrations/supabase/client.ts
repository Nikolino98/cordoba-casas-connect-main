
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qfxpsuozxtekyddflqah.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFmeHBzdW96eHRla3lkZGZscWFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NzAyNTksImV4cCI6MjA2MjI0NjI1OX0.7JqckMeHj_vBuJasGXGlr1FnGXtB9BzQQYEVZoRn2rE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

// Now creating the client with access to the Database types
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
