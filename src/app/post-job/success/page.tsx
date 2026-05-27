import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card py-8 px-4 sm:px-10 text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-surface-900">Payment Successful!</h2>
          <p className="mt-2 text-sm text-surface-500">
            Thank you for posting your job on AI Careers. Your listing is now being processed and will be live shortly.
          </p>
          <div className="mt-8">
            <Link href="/" className="btn-primary w-full text-center">
              Return to Job Board
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}