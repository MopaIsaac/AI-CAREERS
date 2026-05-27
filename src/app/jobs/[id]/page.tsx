import { supabase } from '@/lib/supabase'
import JobDetail from '@/components/jobs/JobDetail'
import { Database } from '@/types/database'
import { notFound } from 'next/navigation'

type JobWithCompany = Database['public']['Tables']['jobs']['Row'] & {
  companies: Database['public']['Tables']['companies']['Row'] | null
}

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const { data, error } = await supabase
    .from('jobs')
    .select('*, companies(*)')
    .eq('id', params.id)
    .single()

  if (error || !data) notFound()

  const job = data as unknown as JobWithCompany

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <JobDetail job={job} />
    </div>
  )
}

export async function generateStaticParams() {
  const { data } = await supabase.from('jobs').select('id').eq('status', 'published')
  return (data || []).map((job: { id: string }) => ({ id: job.id }))
}