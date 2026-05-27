import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'
import { getEmailTemplate } from '@/lib/email-templates'

export async function POST(req: Request) {
  const body = await req.text()
  const headerList = await headers()
  const signature = headerList.get('stripe-signature') as string

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    )
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`)
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any
    const jobId = session.metadata.jobId
    const isFeatured = session.metadata.isFeatured === 'true'

    if (jobId) {
      // 1. Update job status and payment status
      const { data: job, error: updateError } = await (supabase.from('jobs') as any)
        .update({
          status: 'pending_approval' as any,
          payment_status: 'paid' as any,
          is_featured: isFeatured,
          expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
        })
        .eq('id', jobId)
        .select('*, companies(name)')
        .single()

      if (updateError) {
        console.error(`Failed to update job ${jobId}: ${updateError.message}`)
        return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
      }

      // 2. Send confirmation email to employer
      const customerEmail = session.customer_details?.email
      if (customerEmail && job) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
        
        const html = await getEmailTemplate('job-confirmation', {
          jobTitle: job.title,
          companyName: (job as any).companies?.name || 'Your Company',
          location: job.location,
          expiresAt: new Date(job.expires_at).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }),
          planName: isFeatured ? 'Featured Listing · 30 days' : 'Standard Listing · 30 days',
          price: isFeatured ? '£249' : '£149',
          dashboardUrl: `${baseUrl}/employer/dashboard`,
          editUrl: `${baseUrl}/jobs/${job.id}/edit`
        })

        if (html) {
          await sendEmail({
            to: customerEmail,
            subject: 'Job Posting Received - AI Careers',
            html
          })
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}
