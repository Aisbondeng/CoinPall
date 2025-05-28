import { createClient } from '@supabase/supabase-js'

// GANTI dengan Project URL dan anon key milikmu
const supabaseUrl = 'https://xxxxx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
