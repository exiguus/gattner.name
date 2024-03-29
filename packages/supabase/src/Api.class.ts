import { createClient, SupabaseClient } from '@supabase/supabase-js'

export default class Api {
  supabase: SupabaseClient

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL || ''
    const supabaseAnonKey = process.env.SUPABASE_KEY || ''

    if (!supabaseUrl || !supabaseAnonKey) {
      console.warn('Warning: Missing Supabase URL or Key')
    }
    this.supabase = createClient(supabaseUrl, supabaseAnonKey)
  }

  send = async (inserts: unknown[]) => {
    try {
      const { data, error, status } = await this.supabase
        .from('action')
        .insert(inserts, { returning: 'minimal', count: 'planned' })

      if (error && status !== 406) {
        return { error: true }
      }

      if (data) {
        console.log({ data })
        return { error: false }
      }

      if (!error && status === 201) {
        return { error: false }
      }

      return { error: true }
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
      return { error: true }
    }
  }
}
