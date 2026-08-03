'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { AlertCircle, Users, Users2, Shield, User, Mail, Lock } from 'lucide-react'

type UserRole = 'PARENT' | 'CAREGIVER' | 'ADMIN'

const API_CONFIG = {
  REGISTER_URL: 'https://api.yourdomain.com/v1/auth/register', 
}

const roleOptions = {
  PARENT: {
    icon: Users,
    label: 'Parent / Guardian',
    description: 'Sign up to monitor activities and connect with sitters.',
  },
  CAREGIVER: {
    icon: Users2,
    label: 'Caregiver / Staff',
    description: 'Sign up to log daily routines and share updates.',
  },
  ADMIN: {
    icon: Shield,
    label: 'Administrator',
    description: 'Sign up to manage center settings and user provisions.',
  },
}

export default function RegisterPage() {
  const router = useRouter()
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!selectedRole) {
      setError('Please select an account type to proceed.')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(API_CONFIG.REGISTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role: selectedRole }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed.')
      }

      router.push('/auth/login')
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check network connection.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 antialiased overflow-x-hidden relative text-foreground">
      <div className="w-full max-w-2xl space-y-8 relative z-10">
        
        {/* Matched Landing Page Brand Text Header */}
        <div className="flex flex-col items-center justify-center text-center space-y-2">
          <h1 className="text-3xl font-black tracking-wide text-foreground">CareBridge</h1>
          <p className="text-xs text-muted-foreground max-w-sm">
            Professional Sitter & Babysitter Monitoring Infrastructure
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Step 1: Role Selector Cards */}
          <div className="space-y-3">
            <Label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Choose Your Account Type
            </Label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(Object.entries(roleOptions) as Array<[UserRole, typeof roleOptions[UserRole]]>).map(([role, info]) => {
                const Icon = info.icon
                const isSelected = selectedRole === role
                return (
                  <Card
                    key={role}
                    onClick={() => {
                      setSelectedRole(role)
                      if (error.includes('account type')) setError('')
                    }}
                    className={`cursor-pointer transition-all border text-left hover:shadow-md bg-card rounded-[var(--radius)] ${
                      isSelected
                        ? 'border-primary ring-1 ring-primary'
                        : 'border-border hover:border-muted-foreground/30'
                    }`}
                  >
                    <CardContent className="p-4 flex flex-col justify-between h-full">
                      <div>
                        <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                        <h3 className="font-bold text-sm tracking-tight text-foreground">{info.label}</h3>
                        <p className="text-xs text-muted-foreground leading-normal mt-1">{info.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Step 2: Account Details Card */}
          <Card className="border border-border bg-card shadow-xl rounded-[var(--radius)]">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-foreground tracking-tight">Account Credentials</CardTitle>
              <CardDescription className="text-muted-foreground text-xs">
                Provide your details below to establish your profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 z-20" />
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="John Doe"
                    disabled={isLoading}
                    className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground/50 rounded-[var(--radius)] focus-visible:ring-primary/50"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 z-20" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="parent@example.com"
                    disabled={isLoading}
                    className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground/50 rounded-[var(--radius)] focus-visible:ring-primary/50"
                  />
                </div>
              </div>

              {/* Password Grid Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 z-20" />
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      disabled={isLoading}
                      className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground/50 rounded-[var(--radius)] focus-visible:ring-primary/50"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 z-20" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      disabled={isLoading}
                      className="pl-10 bg-background border-border text-foreground placeholder:text-muted-foreground/50 rounded-[var(--radius)] focus-visible:ring-primary/50"
                    />
                  </div>
                </div>

              </div>

              {/* Error Notice */}
              {error && (
                <div className="flex items-start gap-3 p-3 rounded-[var(--radius)] bg-destructive/10 border border-destructive/20 mt-2">
                  <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-destructive font-medium">{error}</p>
                </div>
              )}

              {/* Action Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-[var(--radius)] transition-all mt-2"
              >
                {isLoading ? 'Creating Account...' : 'Register Profile'}
              </Button>
            </CardContent>
          </Card>
        </form>

        {/* Login Hook Anchor */}
        <div className="text-center text-sm">
          <p className="text-muted-foreground text-xs">
            Already registered?{' '}
            <Link href="/auth/login" className="text-primary hover:underline font-bold tracking-wide">
              Sign in to your account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}