import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendEmail } from '@/lib/email'
import { getEmailTemplate } from '@/lib/email-templates'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    // 1. Fetch all active subscribers
    const { data: subscribers, error: subsError } = await supabase
      .from('job_alerts')
      .select('email, preferred_role_type')
      .eq('is_active', true)

    if (subsError) throw subsError

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: 'No active subscribers found.' })
    }

    // 2. Fetch new jobs posted in the last 7 days
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const { data: recentJobs, error: jobsError } = await supabase
      .from('jobs')
      .select('*, companies(name)')
      .eq('status', 'published')
      .gte('created_at', oneWeekAgo.toISOString())
      .order('created_at', { ascending: false })

    if (jobsError) throw jobsError

    if (!recentJobs || recentJobs.length === 0) {
      return NextResponse.json({ message: 'No new jobs this week.' })
    }

    // 3. Calculate Stats for the newsletter
    const companiesSet = new Set(recentJobs.map(j => j.company_id))
    const newJobsCount = recentJobs.length.toString()
    const companiesCount = companiesSet.size.toString()
    const avgSalary = '£110k' // Mock calculation for now

    // 4. Send digest to each subscriber
    let sentCount = 0
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    
    for (const sub of subscribers) {
      // Filter jobs by preference if set
      let filteredJobs = recentJobs
      if (sub.preferred_role_type) {
        filteredJobs = recentJobs.filter(job => 
          job.title.toLowerCase().includes(sub.preferred_role_type!.toLowerCase())
        )
      }

      if (filteredJobs.length === 0) continue

      // Generate the job list HTML using a sub-template
      const jobItems: string[] = []
      for (const job of filteredJobs.slice(0, 5)) {
        const itemHtml = await getEmailTemplate('job-item', {
          featuredClass: job.is_featured ? 'featured' : '',
          featuredBadge: job.is_featured ? '<span style="font-size:11px;color:#d97706;font-weight:600;text-transform:uppercase">Featured</span>' : '',
          title: job.title,
          type: job.type,
          salaryHtml: job.salary_range ? `<span>${job.salary_range}</span>` : '',
          location: job.location,
          description: job.description.substring(0, 100),
          jobUrl: `${baseUrl}/jobs/${job.id}`
        })
        if (itemHtml) jobItems.push(itemHtml)
      }

      const jobListHtml = jobItems.join('')

      const html = await getEmailTemplate('weekly-digest', {
        newJobsCount,
        companiesCount,
        avgSalary,
        jobListHtml,
        allJobsUrl: `${baseUrl}/jobs`,
        unsubscribeUrl: `${baseUrl}/unsubscribe?email=${encodeURIComponent(sub.email)}`,
        baseUrl: baseUrl
      })

      if (html) {
        await sendEmail({
          to: sub.email,
          subject: 'Your Weekly AI Job Digest',
          html
        })
        sentCount++
      }
    }

    return NextResponse.json({ 
      success: true, 
      subscribersCount: subscribers.length,
      emailsSent: sentCount,
      newJobsFound: recentJobs.length 
    })

  } catch (error: any) {
    console.error('Error in send-alerts cron:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
