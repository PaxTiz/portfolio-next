import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://pzwyriqjxvhnqztbnmst.supabase.co", import.meta.env.VITE_TOKEN)

export default supabase