import { supabase } from '@/lib/supabase'
import { Database } from '@/types/database'
import EmployerDashboard from '@/components/employer/EmployerDashboard'

type Job = Database['public']['Tables']['jobs']['Row']

export default async function DashboardPage() {
  // TODO: In production, filter by the authenticated employer's company
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })

  const typedJobs = (jobs || []) as Job[]

  const stats = {
    activeListings: typedJobs.filter(j => j.status === 'published').length,
    totalViews: 0, // TODO: Implement view tracking
    totalApplications: 0, // TODO: Implement application tracking
    pendingApproval: typedJobs.filter(j => j.status === 'draft').length,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <EmployerDashboard stats={stats} jobs={typedJobs} />
    </div>
  )
}