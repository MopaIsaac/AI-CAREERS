import Link from 'next/link'
import { Database } from '@/types/database'
import { parseSalaryRange } from '@/lib/utils'

type Job = Database['public']['Tables']['jobs']['Row'] & {
  companies: Database['public']['Tables']['companies']['Row'] | null
}

export default function JobDetail({ job }: { job: Job }) {
  const salary = parseSalaryRange(job.salary_range || undefined)

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-brand-600 mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to all jobs
      </Link>

      <div className="card p-8">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-100 to-accent-100 flex items-center justify-center text-2xl font-bold text-brand-700 flex-shrink-0">
            {(job.companies?.name || '?').charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-surface-900">{job.title}</h1>
            <p className="text-lg text-surface-500 mt-1">{job.companies?.name} &middot; {job.location || 'Remote'}</p>
            <div className="flex flex-wrap items-center gap-3 mt-4">
              {job.salary_range && (
                <span className="text-lg font-semibold text-green-700 bg-green-50 px-4 py-1.5 rounded-lg">
                  {job.salary_range}
                </span>
              )}
              <span className="text-sm text-surface-500 bg-surface-100 px-3 py-1.5 rounded-lg">
                Posted {job.created_at ? new Date(job.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Recently'}
              </span>
              {job.type && <span className="badge-blue">{job.type}</span>}
              {job.remote_option && (
                <span className={`badge ${
                  job.remote_option === 'Remote' ? 'bg-green-100 text-green-800' :
                  job.remote_option === 'Hybrid' ? 'bg-blue-100 text-blue-800' :
                  'bg-surface-100 text-surface-600'
                }`}>{job.remote_option}</span>
              )}
            </div>
          </div>
        </div>

        {job.is_featured && (
          <div className="mt-6 pt-6 border-t border-surface-200">
            <span className="badge-amber">Featured</span>
          </div>
        )}
      </div>

      <div className="card p-8 mt-6">
        <h2 className="text-xl font-semibold text-surface-900 mb-4">About the Role</h2>
        <div className="text-surface-600 leading-relaxed whitespace-pre-line">
          {job.description || 'No description provided.'}
        </div>
      </div>

      <div className="card p-8 mt-6 bg-gradient-to-br from-brand-600 to-brand-800 border-brand-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Interested in this role?</h2>
          <p className="text-brand-200 mb-6">Apply now and join the AI revolution</p>
          {job.application_url ? (
            <a href={job.application_url} target="_blank" rel="noopener noreferrer"
               className="inline-block bg-white text-brand-700 font-semibold px-8 py-3 rounded-lg hover:bg-brand-50 transition-colors shadow-lg">
              Apply for this job
            </a>
          ) : (
            <button className="bg-white text-brand-700 font-semibold px-8 py-3 rounded-lg hover:bg-brand-50 transition-colors shadow-lg">
              Apply for this job
            </button>
          )}
          <p className="text-brand-300 text-sm mt-3">
            Applications handled directly by {job.companies?.name || 'the company'}
          </p>
        </div>
      </div>
    </div>
  )
}