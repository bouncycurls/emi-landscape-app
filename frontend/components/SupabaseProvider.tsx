'use client'

import { supabase } from '@/lib/supabaseClient'

import { supabase } from '@/lib/supabaseClient'

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      {children}
    </SessionContextProvider>
  )
}
