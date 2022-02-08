import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/superbase/client'
import { useRouter } from 'next/router'

export default function Profile() {
  const [profile, setProfile] = useState(null)
  const router = useRouter()
  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])
  async function update() {
    // eslint-disable-next-line no-unused-vars
    const { user, error } = await supabase.auth.update({
      data: {
        city: 'New York',
      },
    })
    console.log('user:', user)
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchProfile() {
    const profileData = await supabase.auth.user()
    console.log('profileData: ', profileData)
    if (!profileData) {
      router.push('/sign-in')
    } else {
      setProfile(profileData)
    }
  }
  async function signOut() {
    await supabase.auth.signOut()
    router.push('/sign-in')
  }
  if (!profile) return null
  return (
    <div style={{ maxWidth: '420px', margin: '96px auto' }}>
      <h2>Hello, {profile.email}</h2>
      <p>User ID: {profile.id}</p>
      <button onClick={signOut}>Sign Out</button>
      <button onClick={update}>Set Attribute</button>
    </div>
  )
}
