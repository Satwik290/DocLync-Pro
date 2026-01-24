import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'PATIENT' | 'DOCTOR'>('PATIENT')
  const { signup, loading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signup(name, email, password, role)
    } catch (err) {
      console.error('Signup error:', err)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_bottom_right,var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-blue-100 px-4">
      <Card className="w-full max-w-md border-none shadow-2xl bg-white/80 backdrop-blur-md my-8">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-3xl font-extrabold tracking-tight text-center text-slate-900">Join DocLync</CardTitle>
          <CardDescription className="text-center text-slate-500 font-medium">
            Start your journey to better healthcare
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 text-sm text-red-600 bg-red-50/50 border border-red-100 rounded-xl">
                {error}
              </div>
            )}

            {/* MODERN ROLE SWITCHER */}
            <div className="p-1 bg-slate-100 rounded-xl flex items-center mb-6">
                <button
                    type="button"
                    onClick={() => setRole('PATIENT')}
                    className={cn(
                        "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                        role === 'PATIENT' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    Patient
                </button>
                <button
                    type="button"
                    onClick={() => setRole('DOCTOR')}
                    className={cn(
                        "flex-1 py-2 text-sm font-bold rounded-lg transition-all",
                        role === 'DOCTOR' ? "bg-white text-primary shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    Doctor
                </button>
            </div>

            <div className="space-y-1">
              <Label htmlFor="name" className="text-slate-700 font-semibold ml-1">Full Name</Label>
              <Input
                id="name"
                placeholder="Dr. Jane Smith"
                className="h-11 border-slate-200 rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-slate-700 font-semibold ml-1">Work Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@clinic.com"
                className="h-11 border-slate-200 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" title="Password" className="text-slate-700 font-semibold ml-1">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                className="h-11 border-slate-200 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 mt-4 rounded-xl transition-all active:scale-[0.98]" disabled={loading}>
              {loading ? 'Creating account...' : `Sign Up as ${role.charAt(0) + role.slice(1).toLowerCase()}`}
            </Button>

            <p className="text-center text-sm font-medium pt-2">
              Already a member?{' '}
              <Link to="/login" className="text-primary hover:underline underline-offset-4">
                Log in here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}