import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import JobFilter from '@/components/JobFilter'
import NewsletterSignup from '@/components/jobs/NewsletterSignup'
import JobCard from '@/components/jobs/JobCard'
import { Database } from '@/types/database'

type JobWithCompany = Database['public']['Tables']['jobs']['Row'] & {
  companies: Database['public']['Tables']['companies']['Row'] | null
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const query = typeof params.q === 'string' ? params.q : ''
  const type = typeof params.type === 'string' ? params.type : ''
  const remote = typeof params.remote === 'string' ? params.remote : ''
  const location = typeof params.location === 'string' ? params.location : ''
  const salary = typeof params.salary === 'string' ? params.salary : ''

  let supabaseQuery = supabase
    .from('jobs')
    .select('*, companies(*)')
    .eq('status', 'published')
    .order('is_featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (query) supabaseQuery = supabaseQuery.ilike('title', `%${query}%`)
  if (type) supabaseQuery = supabaseQuery.eq('type', type)
  if (remote) supabaseQuery = supabaseQuery.eq('remote_option', remote)
  if (location) supabaseQuery = supabaseQuery.ilike('location', `%${location}%`)
  if (salary) supabaseQuery = supabaseQuery.ilike('salary_range', `%${salary}%`)

  const { data, error } = await supabaseQuery
  const jobs = data as unknown as JobWithCompany[]

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 via-brand-50/30 to-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              AI-native talent marketplace
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-surface-900 leading-tight">
              Where{' '}
              <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
                AI Talent
              </span>{' '}
              Meets Opportunity
            </h1>
            <p className="text-lg sm:text-xl text-surface-500 mt-6 max-w-2xl mx-auto leading-relaxed">
              The specialized job board for Prompt Engineers, LLM Developers, and AI Product Managers.
              Higher signal, less noise.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link href="/jobs" className="btn-primary text-base px-8 py-3.5 text-lg">
                Browse AI Jobs
              </Link>
              <Link href="/post-job" className="btn-secondary text-base px-8 py-3.5 text-lg">
                Post a Job
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-white border-t border-b border-surface-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Jobs', value: '340+' },
              { label: 'AI Companies', value: '120+' },
              { label: 'Talent Matched', value: '2,500+' },
              { label: 'Avg. Salary', value: '£125k' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-2xl sm:text-3xl font-bold text-surface-900">{stat.value}</p>
                <p className="text-sm text-surface-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Board Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-surface-900 sm:text-4xl">
                Latest AI Opportunities
              </h2>
              <p className="mt-2 text-lg text-surface-500">
                Find your next role in the AI revolution.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <JobFilter initialFilters={{ q: query, type, remote, location, salary }} />
            </aside>

            <div className="lg:col-span-3">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-4">
                  Error loading jobs. Please try again later.
                </div>
              )}

              <div className="space-y-4">
                {!jobs || jobs.length === 0 ? (
                  <div className="text-center py-16 bg-white border border-surface-200 rounded-xl">
                    <svg className="w-16 h-16 text-surface-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <p className="text-lg text-surface-500">No jobs found matching your criteria.</p>
                    <p className="text-sm text-surface-400 mt-1">Try adjusting your search or filters</p>
                  </div>
                ) : (
                  jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-heading">Specialized AI Roles</h2>
            <p className="section-subheading">We cover every discipline in the AI workflow</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Prompt Engineers', description: 'Craft and optimize prompts for production-grade LLM applications.', icon: '💬', count: '140+ jobs' },
              { title: 'LLM Developers', description: 'Build RAG systems, fine-tune models, and deploy LLMs at scale.', icon: '🤖', count: '100+ jobs' },
              { title: 'AI Product Managers', description: 'Define AI product strategy and bridge technical capabilities with user needs.', icon: '🎯', count: '60+ jobs' },
            ].map((role) => (
              <div key={role.title} className="card p-8 text-center group hover:border-brand-300 transition-all">
                <span className="text-4xl mb-4 block">{role.icon}</span>
                <h3 className="text-xl font-semibold text-surface-900 mb-3">{role.title}</h3>
                <p className="text-surface-500 text-sm leading-relaxed mb-4">{role.description}</p>
                <span className="badge-purple">{role.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-900 to-surface-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Find Your Next AI Role?</h2>
          <p className="text-lg text-brand-200 mb-8 max-w-2xl mx-auto">
            Join thousands of AI professionals who found their dream role through AI Careers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/jobs" className="bg-white text-surface-900 font-semibold px-8 py-3.5 rounded-lg hover:bg-brand-50 transition-colors text-lg">
              Browse Jobs
            </Link>
            <Link href="/post-job" className="border-2 border-white/20 text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-white/10 transition-colors text-lg">
              Hire AI Talent
            </Link>
          </div>
        </div>
      </section>
    </>
  )

      {/* Newsletter Section */}
      <section className="py-20 bg-surface-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-surface-900">Get AI Jobs Delivered Weekly</h2>
              <p className="text-lg text-surface-500 mt-4 leading-relaxed">
                Subscribe to our newsletter and receive the best AI opportunities directly in your inbox. 
                Prompt Engineers, LLM Developers, AI PMs — curated for you every week.
              </p>
              <div className="flex items-center gap-6 mt-8 text-sm text-surface-400">
                <span className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>No spam</span>
                <span className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Weekly digest</span>
                <span className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Unsubscribe anytime</span>
              </div>
            </div>
            <div className="card p-8">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>
}