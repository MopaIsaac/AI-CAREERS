import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'
import SearchFilters from '@/components/jobs/SearchFilters'
import JobCard from '@/components/jobs/JobCard'

type JobWithCompany = Database['public']['Tables']['jobs']['Row'] & {
  companies: Database['public']['Tables']['companies']['Row'] | null
}

export default async function JobsPage({
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900">AI Jobs</h1>
        <p className="text-surface-500 mt-1">
          Browse the latest opportunities in Prompt Engineering, LLM Development, and AI Product Management.
        </p>
      </div>

      <SearchFilters initialFilters={{ q: query, type, remote, location, salary }} />

      <div className="mt-8">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-4">
            Error loading jobs. Please try again later.
          </div>
        )}

        {!jobs || jobs.length === 0 ? (
          <div className="text-center py-16 bg-white border border-surface-200 rounded-xl">
            <svg className="w-16 h-16 text-surface-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-lg text-surface-500">No jobs found matching your criteria.</p>
            <p className="text-sm text-surface-400 mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}