'use client'

import Link from 'next/link'
import { Database } from '@/types/database'

type Job = Database['public']['Tables']['jobs']['Row']

interface EmployerDashboardProps {
  stats: { activeListings: number; totalViews: number; totalApplications: number; pendingApproval: number }
  jobs: Job[]
}

export default function EmployerDashboard({ stats, jobs }: EmployerDashboardProps) {
  const statCards = [
    { label: 'Active Listings', value: stats.activeListings, color: 'from-brand-500 to-brand-600' },
    { label: 'Total Views', value: stats.totalViews, color: 'from-accent-500 to-accent-600' },
    { label: 'Applications', value: stats.totalApplications, color: 'from-green-500 to-green-600' },
    { label: 'Pending Approval', value: stats.pendingApproval, color: 'from-amber-500 to-amber-600' },
  ]

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-surface-900">Employer Dashboard</h1>
          <p className="text-surface-500 mt-1">Manage your job listings and track performance</p>
        </div>
        <Link href="/post-job" className="btn-primary text-sm">+ Post New Job</Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {statCards.map((s) => (
          <div key={s.label} className="card p-5">
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-3`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-surface-900">{s.value}</p>
            <p className="text-sm text-surface-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-surface-200">
          <h2 className="text-lg font-semibold text-surface-900">Your Listings</h2>
        </div>
        {jobs.length > 0 ? (
          <div className="divide-y divide-surface-100">
            {jobs.map((job) => (
              <div key={job.id} className="px-6 py-4 flex items-center justify-between hover:bg-surface-50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-surface-900 truncate">{job.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-sm text-surface-500">{job.location || 'Remote'}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      job.status === 'published' ? 'bg-green-100 text-green-700' :
                      job.status === 'draft' ? 'bg-amber-100 text-amber-700' :
                      'bg-surface-100 text-surface-500'
                    }`}>
                      {job.status === 'published' ? 'Active' : job.status === 'draft' ? 'Pending' : job.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-surface-500">
                  <span>- views</span>
                  <button className="text-brand-600 hover:text-brand-700 font-medium">Edit</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center">
            <svg className="w-12 h-12 text-surface-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-surface-500">No job listings yet</p>
            <Link href="/post-job" className="text-brand-600 hover:text-brand-700 font-medium text-sm mt-1 inline-block">
              Post your first job
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}