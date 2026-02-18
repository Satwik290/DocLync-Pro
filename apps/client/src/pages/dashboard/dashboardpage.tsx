import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useUserStore } from '@/store/useUserStore'
import { Calendar, MessageSquare, User, Activity, Clock, Users, ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { user } = useUserStore()
  const isDoctor = user?.role === 'DOCTOR'

  return (
    <div className="p-4 md:p-8 bg-slate-50/50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Welcome, {isDoctor ? ' ' : ''}{user?.name}!
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            {isDoctor 
              ? "You have 4 patients scheduled for today." 
              : "Keep track of your appointments and health records."}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-2xl shadow-sm w-fit">
          <div className={`w-2 h-2 rounded-full ${isDoctor ? 'bg-indigo-500' : 'bg-emerald-500'}`} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            {user?.role} Portal
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="border-none shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm transition-transform hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500">
              {isDoctor ? 'Today\'s Patients' : 'Upcoming Visits'}
            </CardTitle>
            <Calendar className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <div className="flex items-center text-xs text-emerald-600 font-medium mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +20% from last week
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm transition-transform hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500">
              {isDoctor ? 'Patient Messages' : 'Active Chats'}
            </CardTitle>
            <MessageSquare className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-slate-400 mt-1">3 unread notifications</p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-sm transition-transform hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500">Identity Profile</CardTitle>
            <User className="h-5 w-5 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold truncate">{user?.name?.split(' ')[0]}</div>
            <p className="text-xs text-slate-400 mt-1">Verified {user?.role}</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Commonly used services for your account.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isDoctor ? (
              <>
                <Button className="h-24 rounded-2xl flex flex-col gap-2 shadow-lg shadow-blue-200" size="lg">
                  <Users className="h-6 w-6" />
                  View All Patients
                </Button>
                <Button variant="outline" className="h-24 rounded-2xl flex flex-col gap-2 border-slate-200 hover:bg-slate-50" size="lg">
                  <Activity className="h-6 w-6" />
                  Prescription History
                </Button>
              </>
            ) : (
              <>
                <Button className="h-24 rounded-2xl flex flex-col gap-2 shadow-lg shadow-indigo-200 bg-indigo-600 hover:bg-indigo-700" size="lg">
                  <Calendar className="h-6 w-6" />
                  Book New Appointment
                </Button>
                <Button variant="outline" className="h-24 rounded-2xl flex flex-col gap-2 border-slate-200 hover:bg-slate-50" size="lg">
                  <MessageSquare className="h-6 w-6" />
                  Message Doctor
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-2 bg-slate-100 rounded-lg">
                    <Clock className="h-4 w-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Update received</p>
                    <p className="text-xs text-slate-500">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}