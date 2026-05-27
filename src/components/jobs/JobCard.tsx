import Link from 'next/link'
import { Database } from '@/types/database'
import { getTimeAgo } from '@/lib/utils'

type Job = Database['public']['Tables']['jobs']['Row'] & {
  companies: Database['public']['Tables']['companies']['Row'] | null
}

export default function JobCard({ job }: { job: Job }) {
  const timeAgo = job.created_at ? getTimeAgo(new Date(job.created_at)) : 'Recently'

  return (
    <Link href={`/jobs/${job.id}`} className={`card p-6 flex flex-col sm:flex-row gap-5 group ${job.is_featured ? 'ring-2 ring-brand-500/20 bg-brand-50/30' : ''}`}>
      <div className="flex-shrink-0">
        {job.companies?.logo_url ? (
          <img src={job.companies.logo_url} alt={job.companies.name} className="w-14 h-14 rounded-xl object-cover" />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-100 to-accent-100 flex items-center justify-center text-lg font-bold text-brand-700">
            {(job.companies?.name || '?').charAt(0)}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {job.is_featured && (
                <span className="badge bg-amber-100 text-amber-800 text-xs">Featured</span>
              )}
              {job.type && (
                <span className={`badge ${
                  job.type === 'Full-time' ? 'bg-green-100 text-green-800' :
                  job.type === 'Part-time' ? 'bg-blue-100 text-blue-800' :
                  job.type === 'Contract' ? 'bg-purple-100 text-purple-800' :
                  'bg-amber-100 text-amber-800'
                }`}>{job.type}</span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-surface-900 group-hover:text-brand-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-surface-500 mt-0.5">{job.companies?.name || 'Unknown Company'} &middot; {job.location || 'Remote'}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-3">
          {job.remote_option && (
            <span className={`text-xs px-2.5 py-1 rounded-md ${
              job.remote_option === 'Remote' ? 'bg-green-100 text-green-700' :
              job.remote_option === 'Hybrid' ? 'bg-blue-100 text-blue-700' :
              'bg-surface-100 text-surface-600'
            }`}>
              {job.remote_option}
            </span>
          )}
          {job.salary_range && (
            <span className="text-sm font-semibold text-surface-700 ml-auto">
              {job.salary_range}
            </span>
          )}
        </div>

        <p className="text-xs text-surface-400 mt-2">{timeAgo}</p>
      </div>
    </Link>
  )
}