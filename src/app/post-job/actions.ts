'use server'

import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export async function createCheckoutSession(formData: FormData) {
  const companyName = formData.get('companyName') as string
  const companyWebsite = formData.get('companyWebsite') as string
  const companyLogo = formData.get('companyLogo') as string
  
  const title = formData.get('title') as string
  const location = formData.get('location') as string
  const type = formData.get('type') as any
  const remote = formData.get('remote') as any
  const salaryRange = formData.get('salaryRange') as string
  const description = formData.get('description') as string
  const applicationUrl = formData.get('applicationUrl') as string
  const isFeatured = formData.get('isFeatured') === 'true'

  // 1. Ensure company exists or create it
  let { data: company, error: companyError } = await (supabase.from('companies') as any)
    .select('id')
    .eq('name', companyName)
    .single()

  if (!company) {
    const { data: newCompany, error: createError } = await (supabase.from('companies') as any)
      .insert({ name: companyName, website: companyWebsite, logo_url: companyLogo })
      .select('id')
      .single()
    
    if (createError) throw new Error('Failed to create company')
    company = newCompany
  }

  // 2. Create job in draft status
  const { data: job, error: jobError } = await (supabase.from('jobs') as any)
    .insert({
      company_id: company.id,
      title,
      location,
      type,
      remote_option: remote,
      salary_range: salaryRange,
      description,
      application_url: applicationUrl,
      is_featured: isFeatured,
      status: 'draft',
      payment_status: 'pending',
    })
    .select('id')
    .single()

  if (jobError || !job) throw new Error('Failed to create job')

  // 3. Create Stripe Checkout session
  const priceId = isFeatured ? 24900 : 14900 // Prices in pence
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'gbp',
        product_data: {
          name: `${isFeatured ? 'Featured' : 'Standard'} Job Listing - ${title}`,
          description: '30-day job posting on AI Careers',
        },
        unit_amount: priceId,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${baseUrl}/post-job/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/post-job/cancel`,
    metadata: { jobId: job.id },
  })

  // 4. Update job with stripe session id
  await ((supabase.from('jobs') as any) as any).update({ stripe_session_id: session.id }).eq('id', job.id)

  if (session.url) {
    redirect(session.url)
  } else {
    throw new Error('Failed to create checkout session')
  }
}