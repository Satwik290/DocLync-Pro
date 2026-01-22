import { Link, useLocation } from 'react-router-dom'
import { Home, Calendar, MessageSquare, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useUserStore } from '@/store/useUserStore'
import { cn } from '@/lib/utils'

export function SideNav() {
  const location = useLocation()
  const { logout } = useAuth()
  const { user } = useUserStore()

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/appointments', icon: Calendar, label: 'Appointments' },
    { to: '/chat', icon: MessageSquare, label: 'Chat' },
    { to: '/profile', icon: User, label: 'Profile' },
  ]

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-card">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">DocLync</h1>
        <p className="text-sm text-muted-foreground mt-1">{user?.name}</p>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.to
          return (
            <Link key={item.to} to={item.to}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className={cn('w-full justify-start', isActive && 'bg-secondary')}
              >
                <Icon className="mr-2 h-4 w-4" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="p-3">
        <Button variant="ghost" className="w-full justify-start" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}
