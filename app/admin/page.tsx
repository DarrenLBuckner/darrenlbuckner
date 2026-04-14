import { Metadata } from 'next'
import PasswordGate from '@/app/components/PasswordGate'
import AdminDashboard from './AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return (
    <PasswordGate page="admin">
      <AdminDashboard />
    </PasswordGate>
  )
}
