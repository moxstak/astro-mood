import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tlpmqvnskoiwfjkdebht.supabase.co'  // <- replace this
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRscG1xdm5za29pd2Zqa2RlYmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NDA0MTAsImV4cCI6MjA2MzUxNjQxMH0.2M1VJjzAFC-UENOaDD2VgPURtfno22lG7piDCF8WJxw'                        // <- and this

export const supabase = createClient(supabaseUrl, supabaseKey)
