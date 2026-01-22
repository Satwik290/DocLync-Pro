import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserStore } from '@/store/useUserStore'
import { Calendar, MessageSquare, User } from 'lucide-react'

export default function DashboardPage() {
  const { user } = useUserStore()

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">Here's what's happening with your health today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">+0% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Unread messages</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.role}</div>
            <p className="text-xs text-muted-foreground">Account type</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Get started with DocLync</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            {user?.role === 'PATIENT' 
              ? 'Book your first appointment or start a chat with your doctor.'
              : 'Manage your appointments and communicate with patients.'}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

