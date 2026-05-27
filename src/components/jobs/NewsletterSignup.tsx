'use client'

import { useState } from 'react'
import { subscribeToAlerts } from '@/app/actions/job-alerts'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [roleType, setRoleType] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const result = await subscribeToAlerts(email, roleType)
    
    setLoading(false)
    if (result.success) {
      setSubmitted(true)
    } else {
      setError(result.error || 'An error occurred')
    }
  }

  if (submitted) {
    return (
      <div className="card p-8 text-center">
        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-surface-900 mb-1">You&apos;re subscribed!</h3>
        <p className="text-surface-500 text-sm">Weekly AI job alerts on the way. No spam, unsubscribe anytime.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="alert-email" className="block text-sm font-medium text-surface-700 mb-1.5">Email address</label>
        <input id="alert-email" type="email" required value={email} onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com" className="input-field" />
      </div>
      <div>
        <label htmlFor="alert-role" className="block text-sm font-medium text-surface-700 mb-1.5">Preferred role</label>
        <select id="alert-role" value={roleType} onChange={e => setRoleType(e.target.value)} className="input-field">
          <option value="">All AI roles</option>
          <option value="prompt-engineer">Prompt Engineer</option>
          <option value="llm-developer">LLM Developer</option>
          <option value="ai-pm">AI Product Manager</option>
          <option value="ml-engineer">ML Engineer</option>
        </select>
      </div>
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? 'Subscribing...' : 'Get Weekly AI Job Alerts'}
      </button>
      <p className="text-xs text-surface-400 text-center">No spam. Unsubscribe anytime.</p>
    </form>
  )
}
