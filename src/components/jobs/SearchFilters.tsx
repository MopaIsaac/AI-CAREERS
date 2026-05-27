'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface JobFilterProps {
  initialFilters: { q: string; type: string; remote: string; location: string; salary: string }
}

export default function SearchFilters({ initialFilters }: JobFilterProps) {
  const router = useRouter()
  const [q, setQ] = useState(initialFilters.q)
  const [type, setType] = useState(initialFilters.type)
  const [remote, setRemote] = useState(initialFilters.remote)
  const [location, setLocation] = useState(initialFilters.location)
  const [salary, setSalary] = useState(initialFilters.salary)

  const updateSearchParams = () => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (type) params.set('type', type)
    if (remote) params.set('remote', remote)
    if (location) params.set('location', location)
    if (salary) params.set('salary', salary)
    router.push(`/?${params.toString()}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateSearchParams()
  }

  const clearAll = () => {
    setQ(''); setType(''); setRemote(''); setLocation(''); setSalary('')
    router.push('/')
  }

  return (
    <div className="bg-white rounded-xl border border-surface-200 p-6 shadow-sm">
      <form onSubmit={handleSearch} className="space-y-5">
        <div>
          <label htmlFor="q" className="block text-sm font-medium text-surface-700 mb-1.5">Search</label>
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text" id="q" name="q" value={q}
              onChange={(e) => setQ(e.target.value)}
              className="input-field pl-10"
              placeholder="e.g. Prompt Engineer"
            />
          </div>
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-surface-700 mb-1.5">Location</label>
          <input type="text" id="location" name="location" value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="input-field" placeholder="e.g. London" />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-surface-700 mb-1.5">Role Type</label>
          <select id="type" name="type" value={type} onChange={(e) => setType(e.target.value)} className="input-field">
            <option value="">All Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div>
          <label htmlFor="remote" className="block text-sm font-medium text-surface-700 mb-1.5">Remote Option</label>
          <select id="remote" name="remote" value={remote} onChange={(e) => setRemote(e.target.value)} className="input-field">
            <option value="">Any</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-surface-700 mb-1.5">Min Salary</label>
          <select id="salary" name="salary" value={salary} onChange={(e) => setSalary(e.target.value)} className="input-field">
            <option value="">Any</option>
            <option value="50">£50k+</option>
            <option value="70">£70k+</option>
            <option value="90">£90k+</option>
            <option value="120">£120k+</option>
          </select>
        </div>

        <button type="submit" className="btn-primary w-full">
          Apply Filters
        </button>

        <button type="button" onClick={clearAll} className="btn-ghost w-full border border-surface-200">
          Clear All
        </button>
      </form>
    </div>
  )
}