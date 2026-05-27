'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'

type Job = Database['public']['Tables']['jobs']['Row']

interface AdminJobItem {
  id: string
  title: string
  companies: { name: string } | null
  location: string | null
  created_at: string
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending')
  const [pendingJobs, setPendingJobs] = useState<AdminJobItem[]>([])
  const [approvedJobs, setApprovedJobs] = useState<AdminJobItem[]>([])
  const [loading, setLoading] = useState(true)

  // Load jobs on mount
  useEffect(() => {
    async function load() {
      const { data: pending } = await supabase
        .from('jobs')
        .select('id, title, companies(name), location, created_at')
        .eq('status', 'pending_approval')
        .order('created_at', { ascending: false })

      const { data: approved } = await supabase
        .from('jobs')
        .select('id, title, companies(name), location, created_at')
        .eq('status', 'published')
        .order('created_at', { ascending: false })

      if (pending) setPendingJobs(pending as unknown as AdminJobItem[])
      if (approved) setApprovedJobs(approved as unknown as AdminJobItem[])
      setLoading(false)
    }
    load()
  }, [])

  const handleApprove = async (id: string) => {
    // @ts-ignore
    await supabase.from('jobs').update({ status: 'published' as any }).eq('id', id)
    const job = pendingJobs.find(j => j.id === id)
    if (job) {
      setPendingJobs((prev) => prev.filter(j => j.id !== id))
      setApprovedJobs((prev) => [job, ...prev])
    }
  }

  const handleReject = async (id: string) => {
    // @ts-ignore
    await supabase.from('jobs').update({ status: 'archived' as any }).eq('id', id)
    setPendingJobs((prev) => prev.filter(j => j.id !== id))
  }

  const tabs = [
    { id: 'pending' as const, label: 'Pending Review', count: pendingJobs.length },
    { id: 'approved' as const, label: 'Approved', count: approvedJobs.length },
  ]

  if (loading) {
    return <div className="max-w-6xl mx-auto px-4 py-20 text-center text-surface-500">Loading...</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-surface-900">Admin Approval Panel</h1>
        <p className="text-surface-500 mt-1">Review, approve, or reject job listings before they go live.</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="card p-5"><p className="text-3xl font-bold text-amber-600">{pendingJobs.length}</p><p className="text-sm text-surface-500">Pending Review</p></div>
        <div className="card p-5"><p className="text-3xl font-bold text-green-600">{approvedJobs.length}</p><p className="text-sm text-surface-500">Approved</p></div>
        <div className="card p-5"><p className="text-3xl font-bold text-surface-900">{pendingJobs.length + approvedJobs.length}</p><p className="text-sm text-surface-500">Total</p></div>
      </div>

      <div className="flex gap-1 bg-surface-100 p-1 rounded-lg mb-6 w-fit">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.id ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-700'
            }`}>
            {tab.label} <span className="ml-2 text-xs bg-surface-200 px-2 py-0.5 rounded-full">{tab.count}</span>
          </button>
        ))}
      </div>

      {activeTab === 'pending' && (
        <div className="space-y-4">
          {pendingJobs.length === 0 ? (
            <div className="card p-12 text-center"><p className="text-lg text-surface-500">All caught up!</p></div>
          ) : (
            pendingJobs.map((job) => (
              <div key={job.id} className="card p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="badge-amber text-xs">Pending</span>
                      <span className="text-xs text-surface-400">{new Date(job.created_at).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-surface-900">{job.title}</h3>
                    <p className="text-sm text-surface-500">{job.companies?.name || 'Unknown'} &middot; {job.location || 'Remote'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleApprove(job.id)} className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">Approve</button>
                    <button onClick={() => handleReject(job.id)} className="px-4 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors">Reject</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'approved' && (
        <div className="space-y-4">
          {approvedJobs.length === 0 ? (
            <div className="card p-12 text-center"><p className="text-surface-500">No approved listings.</p></div>
          ) : (
            approvedJobs.map((job) => (
              <div key={job.id} className="card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="badge-green text-xs mb-1 inline-block">Approved</span>
                    <h3 className="text-lg font-semibold text-surface-900">{job.title}</h3>
                    <p className="text-sm text-surface-500">{job.companies?.name} &middot; {job.location || 'Remote'}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
