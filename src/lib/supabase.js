import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zjwwpxgfjuqbunztfkia.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpqd3dweGdmanVxYnVuenRma2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ2Nzk2ODcsImV4cCI6MjA5MDI1NTY4N30.N4kZduT1a8Yq9mERB-i9MrTvnFz9y2uL9HKdlLya2qs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
