'use server'

import { supabase } from '@/lib/supabase'
import { revalidatePath } from 'next/cache'

export async function approveJob(formData: FormData) {
  const jobId = formData.get('jobId') as string
  
  if (!jobId) return

  // @ts-ignore
  const { error } = await (supabase.from('jobs') as any)
    .update({ status: 'published' })
    .eq('id', jobId)

  if (error) {
    console.error('Error approving job:', error)
    return
  }

  revalidatePath('/admin')
  revalidatePath('/')
}

export async function rejectJob(formData: FormData) {
  const jobId = formData.get('jobId') as string
  
  if (!jobId) return

  // @ts-ignore
  const { error } = await (supabase.from('jobs') as any)
    .update({ status: 'archived' })
    .eq('id', jobId)

  if (error) {
    console.error('Error rejecting job:', error)
    return
  }

  revalidatePath('/admin')
}
