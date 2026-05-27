import { createCheckoutSession } from './actions'

export default function PostJobPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <form action={createCheckoutSession} className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-surface-900">Post a Job</h1>
          <p className="text-surface-500 mt-1">
            Reach the best AI talent in the industry. Your listing goes live after payment.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-surface-900">Select Listing Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="card p-6 cursor-pointer hover:border-brand-500 transition-all has-[:checked]:ring-2 has-[:checked]:ring-brand-500 has-[:checked]:bg-brand-50/50">
              <input type="radio" name="isFeatured" value="false" defaultChecked className="sr-only" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-surface-600">Standard Listing</p>
                <p className="text-3xl font-bold text-surface-900">&pound;149</p>
                <p className="text-sm text-surface-500">30 days visibility on the job board</p>
              </div>
            </label>
            <label className="card p-6 cursor-pointer hover:border-brand-500 transition-all has-[:checked]:ring-2 has-[:checked]:ring-brand-500 has-[:checked]:bg-brand-50/50">
              <input type="radio" name="isFeatured" value="true" className="sr-only" />
              <div className="space-y-2">
                <span className="badge-amber text-xs">Best value</span>
                <p className="text-sm font-medium text-surface-600">Featured Listing</p>
                <p className="text-3xl font-bold text-brand-600">&pound;249</p>
                <p className="text-sm text-surface-500">Top of page + highlighted card</p>
              </div>
            </label>
          </div>
        </div>

        {/* Company Information */}
        <div className="card p-6 space-y-5">
          <h2 className="text-lg font-semibold text-surface-900">Company Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label htmlFor="companyName" className="block text-sm font-medium text-surface-700 mb-1.5">Company Name *</label>
              <input type="text" name="companyName" id="companyName" required className="input-field" placeholder="e.g. OpenAI" />
            </div>
            <div>
              <label htmlFor="companyWebsite" className="block text-sm font-medium text-surface-700 mb-1.5">Website URL *</label>
              <input type="url" name="companyWebsite" id="companyWebsite" required className="input-field" placeholder="https://example.com" />
            </div>
            <div>
              <label htmlFor="companyLogo" className="block text-sm font-medium text-surface-700 mb-1.5">Logo URL</label>
              <input type="url" name="companyLogo" id="companyLogo" className="input-field" placeholder="https://example.com/logo.png" />
            </div>
          </div>
        </div>

        {/* Job Details */}
        <div className="card p-6 space-y-5">
          <h2 className="text-lg font-semibold text-surface-900">Job Details</h2>
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block text-sm font-medium text-surface-700 mb-1.5">Job Title *</label>
            <input type="text" name="title" id="title" required className="input-field" placeholder="e.g. Senior Prompt Engineer" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-surface-700 mb-1.5">Location *</label>
              <input type="text" name="location" id="location" required className="input-field" placeholder="e.g. Remote, London" />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-surface-700 mb-1.5">Employment Type *</label>
              <select id="type" name="type" required className="input-field">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label htmlFor="remote" className="block text-sm font-medium text-surface-700 mb-1.5">Remote Option *</label>
              <select id="remote" name="remote" required className="input-field">
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="salaryRange" className="block text-sm font-medium text-surface-700 mb-1.5">Salary Range</label>
            <input type="text" name="salaryRange" id="salaryRange" className="input-field" placeholder="e.g. &pound;80k - &pound;120k" />
          </div>
          <div>
            <label htmlFor="applicationUrl" className="block text-sm font-medium text-surface-700 mb-1.5">Application URL / Email *</label>
            <input type="text" name="applicationUrl" id="applicationUrl" required className="input-field" placeholder="https://company.com/careers/apply" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-surface-700 mb-1.5">Job Description *</label>
            <textarea id="description" name="description" rows={6} required className="input-field resize-y" placeholder="Describe the role, responsibilities, and what makes this opportunity unique..." />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-surface-500">Secure payment powered by Stripe.</p>
          <button type="submit" className="btn-primary text-base px-8 py-3">
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  )
}