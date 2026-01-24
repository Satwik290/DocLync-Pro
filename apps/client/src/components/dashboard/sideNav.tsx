import { Link, useLocation } from 'react-router-dom'
import { Home, Calendar, MessageSquare, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useUserStore } from '@/store/useUserStore'
import { cn } from '@/lib/utils'
import Logo from "@/assets/ChatGPT Image Jan 23, 2026, 09_18_35 PM.png"

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
    <div className="flex h-screen w-64 flex-col border-r bg-white shadow-sm">
      {/* Brand Logo Section */}
      <div className="p-6 flex flex-col items-center border-b border-slate-50">
        <img
          src={Logo}
          alt="DocLync Logo"
          className="h-16 w-auto object-contain drop-shadow-sm mb-2"
        />
        <div className="text-center">
          <h1 className="text-xl font-black tracking-tighter text-slate-800">
            DocLync<span className="text-blue-600">Pro</span>
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-1">
            {user?.role || 'Guest'} Portal
          </p>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-2 px-4 py-6">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.to
          return (
            <Link key={item.to} to={item.to} className="block">
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start h-11 rounded-xl transition-all duration-200 group',
                  isActive 
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                )}
              >
                <Icon className={cn(
                  "mr-3 h-5 w-5 transition-colors",
                  isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"
                )} />
                <span className="font-semibold">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User Info & Logout Section */}
      <div className="p-4 mt-auto border-t border-slate-50 bg-slate-50/30">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold border-2 border-white shadow-sm">
            {user?.name?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-800 truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          className="w-full justify-start h-11 rounded-xl text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-colors" 
          onClick={logout}
        >
          <LogOut className="mr-3 h-5 w-5" />
          <span className="font-semibold">Logout</span>
        </Button>
      </div>
    </div>
  )
}