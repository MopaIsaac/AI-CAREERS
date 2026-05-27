'use server'

import { supabase } from '@/lib/supabase'

export async function subscribeToAlerts(email: string, roleType: string) {
  if (!email) {
    return { error: 'Email is required' }
  }

  const { error } = await supabase
    .from('job_alerts')
    .insert({
      email: email,
      preferred_role_type: roleType || null,
      is_active: true
    } as any)

  if (error) {
    console.error('Error subscribing to alerts:', error)
    return { error: 'Failed to subscribe. Please try again.' }
  }

  return { success: true }
}
