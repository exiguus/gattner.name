import React from 'react'
import { supabase } from '../lib/superbase/client'

// eslint-disable-next-line react/prop-types
export default function Protected({ user, hello }) {
  console.log({ user })
  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <h2>{hello}</h2>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: '/sign-in' } }
  }

  const hello = 'Hello from protected route'
  return { props: { user, hello } }
}
