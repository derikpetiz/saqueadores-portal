import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Diagnóstico para ver na consola do navegador (F12)
console.log('SUPABASE URL ATIVA:', supabaseUrl ? 'Carregada com sucesso ✅' : 'EM FALTA ❌');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);