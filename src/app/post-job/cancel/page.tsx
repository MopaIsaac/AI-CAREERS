import Link from 'next/link'

export default function CancelPage() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="card py-8 px-4 sm:px-10 text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-surface-900">Payment Cancelled</h2>
          <p className="mt-2 text-sm text-surface-500">
            Your payment was not completed. Your job has not been published. You can try again whenever you&apos;re ready.
          </p>
          <div className="mt-8">
            <Link href="/post-job" className="btn-primary w-full text-center">
              Back to Post Job
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}