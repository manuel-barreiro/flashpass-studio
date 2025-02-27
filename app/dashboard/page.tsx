import DashboardContent from '@/components/kokonutui/dashboard-content'
import PageLayout from '@/components/page-layout'

export default function DashboardPage (): React.JSX.Element {
  return (
    <PageLayout title='Dashboard'>
      <DashboardContent />
    </PageLayout>
  )
}
