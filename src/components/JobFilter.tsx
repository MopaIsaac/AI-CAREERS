'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function JobFilter({ initialFilters }: { initialFilters: { q: string; type: string; remote: string; location: string; salary: string } }) {
  const router = useRouter()
  const [q, setQ] = useState(initialFilters.q)
  const [type, setType] = useState(initialFilters.type)
  const [remote, setRemote] = useState(initialFilters.remote)
  const [location, setLocation] = useState(initialFilters.location)
  const [salary, setSalary] = useState(initialFilters.salary)

  const update = () => {
    const p = new URLSearchParams()
    if (q) p.set('q', q); if (type) p.set('type', type); if (remote) p.set('remote', remote); if (location) p.set('location', location); if (salary) p.set('salary', salary)
    router.push(`/?${p.toString()}`)
  }

  return (
    <div className="bg-white rounded-xl border border-surface-200 p-6 shadow-sm">
      <form onSubmit={e => { e.preventDefault(); update() }} className="space-y-5">
        <div><label className="block text-sm font-medium text-surface-700 mb-1.5">Search</label>
          <input type="text" value={q} onChange={e=>setQ(e.target.value)} className="input-field" placeholder="e.g. Prompt Engineer" /></div>
        <div><label className="block text-sm font-medium text-surface-700 mb-1.5">Location</label>
          <input type="text" value={location} onChange={e=>setLocation(e.target.value)} className="input-field" placeholder="e.g. London" /></div>
        <div><label className="block text-sm font-medium text-surface-700 mb-1.5">Type</label>
          <select value={type} onChange={e=>setType(e.target.value)} className="input-field">
            <option value="">All</option><option value="Full-time">Full-time</option><option value="Part-time">Part-time</option><option value="Contract">Contract</option>
          </select></div>
        <div><label className="block text-sm font-medium text-surface-700 mb-1.5">Remote</label>
          <select value={remote} onChange={e=>setRemote(e.target.value)} className="input-field">
            <option value="">Any</option><option value="Remote">Remote</option><option value="Hybrid">Hybrid</option><option value="On-site">On-site</option>
          </select></div>
        <div><label className="block text-sm font-medium text-surface-700 mb-1.5">Salary</label>
          <select value={salary} onChange={e=>setSalary(e.target.value)} className="input-field">
            <option value="">Any</option><option value="50">£50k+</option><option value="70">£70k+</option><option value="90">£90k+</option><option value="120">£120k+</option>
          </select></div>
        <button type="submit" className="btn-primary w-full">Apply Filters</button>
        <button type="button" onClick={()=>{setQ('');setType('');setRemote('');setLocation('');setSalary('');router.push('/')}} className="btn-ghost w-full border border-surface-200">Clear All</button>
      </form>
    </div>
  )
}
