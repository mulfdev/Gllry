import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_NFT_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
