'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/app/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import {
  AlertCircle,
  Users,
  Users2,
  Shield,
  Mail,
  Lock,
} from 'lucide-react'

type UserRole = 'PARENT' | 'CAREGIVER' | 'ADMIN'

const roleOptions = {
  PARENT: {
    icon: Users,
    label: 'Parent / Guardian',
    description: 'Sign in to monitor activities.',
  },
  CAREGIVER: {
    icon: Users2,
    label: 'Caregiver / Staff',
    description: 'Sign in to log daily updates.',
  },
  ADMIN: {
    icon: Shield,
    label: 'Administrator',
    description: 'Sign in to manage center rules.',
  },
} as const

export default function LoginPage() {
  const router = useRouter()

  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setError('')

  if (!selectedRole) {
    setError('Please select a role.')
    return
  }

  console.log("Selected Role:", selectedRole)

  if (selectedRole === 'PARENT') {
    router.push('/dashboard/parent')
    return
  }

  if (selectedRole === 'CAREGIVER') {
    router.push('/dashboard/caregiver')
    return
  }

  if (selectedRole === 'ADMIN') {
    router.push('/dashboard/admin')
    return
  }
}

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 antialiased overflow-x-hidden relative text-foreground">
      <div className="w-full max-w-2xl space-y-8 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <h1 className="text-3xl font-black tracking-wide text-foreground">
            CareBridge
          </h1>

          <p className="text-xs text-muted-foreground max-w-sm">
            Professional Sitter & Babysitter Monitoring Infrastructure
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Role Selection */}
          <div className="space-y-3">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Select Your Gateway Role
            </Label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(Object.keys(roleOptions) as UserRole[]).map((role) => {
                const info = roleOptions[role]
                const Icon = info.icon
                const isSelected = selectedRole === role

                return (
                  <Card
                    key={role}
                    onClick={() => {
                      console.log('Clicked Role:', role)
                      setSelectedRole(role)
                      setError('')
                    }}
                    className={`cursor-pointer transition-all border text-left hover:shadow-md bg-card rounded-[var(--radius)] ${
                      isSelected
                        ? 'border-primary ring-1 ring-primary'
                        : 'border-border hover:border-muted-foreground/30'
                    }`}
                  >
                    <CardContent className="p-4">
                      <Icon
                        className={`w-5 h-5 mb-2 ${
                          isSelected
                            ? 'text-primary'
                            : 'text-muted-foreground'
                        }`}
                      />

                      <h3 className="font-bold text-sm">
                        {info.label}
                      </h3>

                      <p className="text-xs text-muted-foreground mt-1">
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Login Card */}
          <Card>
            <CardHeader>
              <CardTitle>Sign In Credentials</CardTitle>
              <CardDescription>
                Provide account authentication markers
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">

              <div className="space-y-2">
                <Label>Email Address</Label>

                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50" />

                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>

                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground/50" />

                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded border border-red-300 bg-red-100 p-3">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </CardContent>
          </Card>
        </form>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Don't have an account?{' '}
            <Link
              href="/auth/register"
              className="text-primary font-bold"
            >
              Register now
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}