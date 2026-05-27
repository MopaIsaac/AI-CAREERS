import Link from 'next/link'
import { Database } from '@/types/database'

type Job = Database['public']['Tables']['jobs']['Row'] & {
  companies: Database['public']['Tables']['companies']['Row'] | null
}

export default function JobCard({ job }: { job: Job }) {
  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-md transition-shadow border border-gray-200">
      <div className="flex items-start space-x-4">
        {job.companies?.logo_url ? (
          <img
            src={job.companies.logo_url}
            alt={job.companies.name}
            className="w-12 h-12 rounded bg-gray-100 flex-shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl flex-shrink-0">
            {job.companies?.name.charAt(0) || 'J'}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <Link href={`/jobs/${job.id}`}>
              <h3 className="text-lg font-bold text-indigo-600 truncate hover:underline">
                {job.title}
              </h3>
            </Link>
            {job.is_featured && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
                Featured
              </span>
            )}
          </div>
          <div className="mt-1">
            <p className="text-sm font-semibold text-gray-900">{job.companies?.name}</p>
          </div>
          <div className="mt-2 flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {job.location}
            </div>
            <div className="flex items-center">
              <svg className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-1-1H6zm3 3h2v1H9V5zm6 3H5v8h10V8z" clipRule="evenodd" />
              </svg>
              {job.type}
            </div>
            <div className="flex items-center">
              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                job.remote_option === 'Remote' ? 'bg-green-100 text-green-800' :
                job.remote_option === 'Hybrid' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {job.remote_option}
              </span>
            </div>
            {job.salary_range && (
              <div className="flex items-center text-gray-900 font-medium">
                {job.salary_range}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
