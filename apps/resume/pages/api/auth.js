import { supabase } from '../../lib/superbase/client'

export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res)
}
