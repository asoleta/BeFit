import {createClient} from '@supabase/supabase-js'

const URL = 'https://ddtepwvtxltaokvtnntq.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkdGVwd3Z0eGx0YW9rdnRubnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NjgyMDksImV4cCI6MjA0NzA0NDIwOX0.p7i3jS54AzHhswO57W0qn3kL4wtyoWHPDMsjEGOw-v8'

export const supabase = createClient(URL, API_KEY);