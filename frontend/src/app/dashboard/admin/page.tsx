'use client'

// import { useAuth } from '@/lib/auth-context' // 🚫 BACKEND COMMENTED OUT
// import { ProtectedRoute } from '@/app/components/protected-route' // 🚫 BACKEND COMMENTED OUT
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Avatar, AvatarFallback } from '@/app/components/ui/avtar' // Typo fixed previously
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation' // 🌟 Step 1: Import useRouter from next/navigation
import { LogOut, Users, Building2, TrendingUp, Activity, Settings, AlertCircle, CheckCircle2, Plus, Edit2 } from 'lucide-react'

interface AdminDashboardProps {
  mockModeBypass?: () => void;
}

export default function AdminDashboard({ mockModeBypass }: AdminDashboardProps) {
  const router = useRouter() // 🌟 Step 2: Initialize the router hooks instance

  /* -------------------------------------------------------------
     🚫 BACKEND COMMENTED OUT: Replacing context states with mock static fields
     -------------------------------------------------------------
  const { user, logout } = useAuth()
  ------------------------------------------------------------- */
  const mockLogoutHandler = () => {
    if (mockModeBypass) {
      mockModeBypass(); // Go back to login stage form if bypass handler is present
    } else {
      // 🌟 Step 3: Automatically redirect to your application's login path
      // Replace '/login' with whatever your custom route path is (e.g., '/', '/auth/login', etc.)
      router.push('/auth/login'); 
    }
  };

  const [selectedTab, setSelectedTab] = useState<'overview' | 'users' | 'center' | 'reports'>('overview')

  // Mock data for demonstration
  const mockStats = {
    totalChildren: 48,
    totalStaff: 12,
    totalParents: 45,
    enrollmentRate: 96,
    avgActivitiesPerDay: 8.5,
    systemHealth: 99.9,
  }

  const mockRecentActivity = [
    { id: 1, type: 'enrollment', user: 'Sarah Johnson', action: 'enrolled new child', time: '2 hours ago' },
    { id: 2, type: 'activity', user: 'Maria Garcia', action: 'logged 8 activities', time: '1 hour ago' },
    { id: 3, type: 'photo', user: 'David Chen', action: 'uploaded 12 photos', time: '45 minutes ago' },
  ]

  const mockUsers = [
    { id: 1, name: 'Maria Garcia', email: 'maria@carebridge.com', role: 'CAREGIVER', status: 'ACTIVE' },
    { id: 2, name: 'David Chen', email: 'david@carebridge.com', role: 'CAREGIVER', status: 'ACTIVE' },
    { id: 3, name: 'Sarah Johnson', email: 'sarah@carebridge.com', role: 'CAREGIVER', status: 'ACTIVE' },
  ]

  return (
    <div className="min-h-screen w-full bg-zinc-50 text-zinc-900 flex flex-col items-center justify-start antialiased">
      {/* Top Header Navigation Panel */}
      <header className="w-full border-b border-purple-100 bg-white sticky top-0 z-40 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-12 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center max-w-[1600px] mx-auto">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-zinc-900">Administration</h1>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">Center Management & Analytics</p>
            </div>

            <div className="w-full sm:w-auto flex justify-end">
              <Button 
                onClick={mockLogoutHandler} 
                variant="outline" 
                size="default" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 font-bold transition-all active:scale-95 z-50 px-4 py-2 border-purple-200 text-purple-700 hover:bg-purple-50 hover:text-purple-800 text-xs sm:text-sm"
              >
                <LogOut className="w-4 h-4 stroke-[2.5]" />
                <span>Sign Out</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="w-full max-w-[1600px] px-4 sm:px-6 lg:px-12 py-6 sm:py-8 space-y-8 flex flex-col">
        {/* Metrics Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
          {/* Children */}
          <Card className="border-t-4 border-t-purple-600 bg-white shadow-md shadow-purple-100/40 border-x-purple-100 border-b-purple-100 w-full">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider font-black text-purple-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Children
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl sm:text-3xl font-black text-zinc-900">{mockStats.totalChildren}</p>
            </CardContent>
          </Card>

          {/* Staff */}
          <Card className="border-t-4 border-t-purple-500 bg-white shadow-md shadow-purple-100/40 border-x-purple-100 border-b-purple-100 w-full">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider font-black text-purple-600 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Staff
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl sm:text-3xl font-black text-zinc-900">{mockStats.totalStaff}</p>
            </CardContent>
          </Card>

          {/* Parents */}
          <Card className="border-t-4 border-t-purple-400 bg-white shadow-md shadow-purple-100/40 border-x-purple-100 border-b-purple-100 w-full">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider font-black text-purple-500 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Parents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl sm:text-3xl font-black text-zinc-900">{mockStats.totalParents}</p>
            </CardContent>
          </Card>

          {/* Enrollment */}
          <Card className="border-t-4 border-t-amber-500 bg-white shadow-md shadow-purple-100/40 border-x-purple-100 border-b-purple-100 w-full">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider font-black text-amber-700 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> Enrollment
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl sm:text-3xl font-black text-amber-700">{mockStats.enrollmentRate}%</p>
            </CardContent>
          </Card>

          {/* Activities */}
          <Card className="border-t-4 border-t-purple-600 bg-white shadow-md shadow-purple-100/40 border-x-purple-100 border-b-purple-100 w-full">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider font-black text-purple-700 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl sm:text-3xl font-black text-zinc-900">{mockStats.avgActivitiesPerDay}</p>
            </CardContent>
          </Card>

          {/* System */}
          <Card className="border-t-4 border-t-emerald-500 bg-white shadow-md shadow-purple-100/40 border-x-purple-100 border-b-purple-100 w-full">
            <CardHeader className="pb-2 p-4">
              <CardTitle className="text-[11px] uppercase tracking-wider font-black text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> System
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-2xl sm:text-3xl font-black text-emerald-600">{mockStats.systemHealth}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Workspace Framework Tabs */}
        <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)} defaultValue="overview" className="w-full">
          <Card className="w-full bg-white border border-purple-100 shadow-md shadow-purple-100/40">
            <CardHeader className="border-b border-purple-100 px-4 sm:px-6">
              <TabsList className="grid w-full grid-cols-4 bg-zinc-100 p-1 rounded-xl border border-zinc-200/60">
                <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white font-black text-[11px] sm:text-xs transition-all rounded-lg py-2">Overview</TabsTrigger>
                <TabsTrigger value="users" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white font-black text-[11px] sm:text-xs transition-all rounded-lg py-2">Users</TabsTrigger>
                <TabsTrigger value="center" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white font-black text-[11px] sm:text-xs transition-all rounded-lg py-2">Center</TabsTrigger>
                <TabsTrigger value="reports" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white font-black text-[11px] sm:text-xs transition-all rounded-lg py-2">Reports</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="p-4 sm:p-6">
              {/* Overview Tab Content */}
              <TabsContent value="overview" className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-0 w-full items-start">
                <div className="w-full lg:col-span-2 space-y-4">
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-zinc-900">Recent Activity</h3>
                    <p className="text-xs text-zinc-500">Real-time update logs</p>
                  </div>
                  <div className="space-y-3 w-full">
                    {mockRecentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3.5 p-4 rounded-xl border border-purple-100 bg-white shadow-sm w-full transition-all hover:border-purple-200">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-lg">
                          {activity.type === 'enrollment' && '👤'}
                          {activity.type === 'activity' && '📝'}
                          {activity.type === 'photo' && '📸'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm tracking-tight text-zinc-800">{activity.user}</p>
                          <p className="text-xs text-zinc-500 mt-0.5 break-words leading-relaxed">{activity.action}</p>
                          <p className="text-[11px] font-bold text-purple-500 mt-2">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="w-full lg:col-span-1 space-y-4">
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-zinc-900">Quick Actions</h3>
                    <p className="text-xs text-zinc-500">Administrative tools</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 w-full">
                    <Link href="/dashboard/admin/users" className="block w-full">
                      <Card className="shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer bg-white group border border-purple-100 h-full">
                        <CardContent className="pt-5 pb-5 text-center flex flex-col justify-center items-center">
                          <div className="h-11 w-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform border border-purple-100">
                            <Users className="w-5 h-5" />
                          </div>
                          <p className="font-bold text-xs tracking-wide text-zinc-800 group-hover:text-purple-700 transition-colors">Manage Users</p>
                        </CardContent>
                      </Card>
                    </Link>

                    <Link href="/dashboard/admin/center" className="block w-full">
                      <Card className="shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer bg-white group border border-purple-100 h-full">
                        <CardContent className="pt-5 pb-5 text-center flex flex-col justify-center items-center">
                          <div className="h-11 w-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform border border-purple-100">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <p className="font-bold text-xs tracking-wide text-zinc-800 group-hover:text-purple-700 transition-colors">Center Info</p>
                        </CardContent>
                      </Card>
                    </Link>

                    <Link href="/dashboard/admin/reports" className="block w-full">
                      <Card className="shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer bg-white group border border-purple-100 h-full">
                        <CardContent className="pt-5 pb-5 text-center flex flex-col justify-center items-center">
                          <div className="h-11 w-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform border border-purple-100">
                            <TrendingUp className="w-5 h-5" />
                          </div>
                          <p className="font-bold text-xs tracking-wide text-zinc-800 group-hover:text-purple-700 transition-colors">View Reports</p>
                        </CardContent>
                      </Card>
                    </Link>

                    <Card className="shadow-sm hover:border-purple-300 transition-all cursor-pointer bg-white group border border-purple-100">
                      <CardContent className="pt-5 pb-5 text-center flex flex-col justify-center items-center">
                        <div className="h-11 w-11 rounded-xl bg-zinc-50 text-zinc-500 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform border border-zinc-200">
                          <Settings className="w-5 h-5" />
                        </div>
                        <p className="font-bold text-xs tracking-wide text-zinc-800">Security</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Users Tab Content */}
              <TabsContent value="users" className="mt-0 space-y-4">
                <div className="flex flex-row justify-between items-center">
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-zinc-900">User Management</h3>
                    <p className="text-xs text-zinc-500">Manage registered profile entities</p>
                  </div>
                  <Button size="sm" className="gap-1 bg-purple-600 text-white hover:bg-purple-700 font-bold text-xs shadow-sm rounded-lg px-3 py-1.5 sm:px-4 sm:py-2">
                    <Plus className="w-3.5 h-3.5 stroke-[3]" />
                    <span className="hidden sm:inline">Add User</span>
                  </Button>
                </div>

                <div className="overflow-x-auto border border-zinc-200/80 rounded-xl shadow-sm bg-white w-full">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead className="bg-zinc-50 border-b border-zinc-200/80">
                      <tr>
                        <th className="px-6 py-3.5 text-xs font-black uppercase tracking-wider text-zinc-500">Name</th>
                        <th className="px-6 py-3.5 text-xs font-black uppercase tracking-wider text-zinc-500">Email</th>
                        <th className="px-6 py-3.5 text-xs font-black uppercase tracking-wider text-zinc-500">Role</th>
                        <th className="px-6 py-3.5 text-xs font-black uppercase tracking-wider text-zinc-500">Status</th>
                        <th className="px-6 py-3.5 text-xs font-black uppercase tracking-wider text-zinc-500 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold text-zinc-800">{user.name}</td>
                          <td className="px-6 py-4 text-sm text-zinc-500">{user.email}</td>
                          <td className="px-6 py-4 text-sm">
                            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 font-bold text-[10px] uppercase px-2 py-0.5">
                              {user.role.toLowerCase()}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <Badge className={`font-black text-[10px] tracking-wide uppercase px-2 py-0.5 ${user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-none' : 'bg-zinc-100 text-zinc-600'}`}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-sm text-right">
                            <Button size="sm" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50 font-bold text-xs h-8 px-3">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Center Tab Content */}
              <TabsContent value="center" className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-0 w-full items-start">
                <Card className="w-full bg-white border border-purple-100 shadow-sm rounded-xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-black tracking-tight text-zinc-900">Center Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-wider text-zinc-400">Center Name</p>
                      <p className="font-bold text-sm text-zinc-800 mt-0.5">Sunshine Daycare Center</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-wider text-zinc-400">License Number</p>
                      <p className="font-bold text-sm text-zinc-800 mt-0.5">DCC-2024-001234</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase font-black tracking-wider text-zinc-400">Address</p>
                      <p className="font-bold text-sm text-zinc-500 mt-0.5 leading-relaxed">123 Childcare Lane, City, State 12345</p>
                    </div>
                    <Button className="w-full gap-2 bg-purple-600 text-white hover:bg-purple-700 font-bold text-xs shadow-sm rounded-lg py-2.5 mt-2">
                      <Edit2 className="w-3.5 h-3.5" /> Edit Settings
                    </Button>
                  </CardContent>
                </Card>

                <Card className="w-full bg-white border border-purple-100 shadow-sm rounded-xl">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base font-black tracking-tight text-zinc-900">Compliance Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 shadow-none">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">License Valid</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 shadow-none">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Insurance Active</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/60 border border-amber-100 shadow-none">
                      <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 animate-pulse" />
                      <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Safety Inspection In Review</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Reports Tab Content */}
              <TabsContent value="reports" className="mt-0 space-y-4">
                <div>
                  <h3 className="text-lg font-black tracking-tight text-zinc-900">Available Reports</h3>
                  <p className="text-xs text-zinc-500">Exportable core metrics</p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3.5 w-full">
                  <Link href="/dashboard/admin/reports/enrollment" className="block w-full">
                    <Card className="shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer bg-white group border border-purple-100 h-full">
                      <CardContent className="p-4 sm:p-5 flex flex-col items-start">
                        <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3 border border-purple-100 group-hover:scale-105 transition-transform">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-xs tracking-tight text-zinc-800 group-hover:text-purple-700 transition-colors">Enrollment</h4>
                        <p className="text-[10px] text-zinc-400 mt-1 line-clamp-1">Capacity analysis</p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link href="/dashboard/admin/reports/activities" className="block w-full">
                    <Card className="shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer bg-white group border border-purple-100 h-full">
                      <CardContent className="p-4 sm:p-5 flex flex-col items-start">
                        <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3 border border-purple-100 group-hover:scale-105 transition-transform">
                          <Activity className="w-4 h-4" />
                        </div>
                        <h4 className="font-bold text-xs tracking-tight text-zinc-800 group-hover:text-purple-700 transition-colors">Activity Report</h4>
                        <p className="text-[10px] text-zinc-400 mt-1 line-clamp-1">Daily records log</p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Card className="shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer bg-white group border border-purple-100 h-full">
                    <CardContent className="p-4 sm:p-5 flex flex-col items-start">
                      <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3 border border-purple-100 group-hover:scale-105 transition-transform">
                        <Users className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-xs tracking-tight text-zinc-800">Staff Report</h4>
                      <p className="text-[10px] text-zinc-400 mt-1 line-clamp-1">Schedule shifts</p>
                    </CardContent>
                  </Card>

                  <Card className="shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer bg-white group border border-purple-100 h-full">
                    <CardContent className="p-4 sm:p-5 flex flex-col items-start">
                      <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-3 border border-purple-100 group-hover:scale-105 transition-transform text-sm">
                        💰
                      </div>
                      <h4 className="font-bold text-xs tracking-tight text-zinc-800">Financials</h4>
                      <p className="text-[10px] text-zinc-400 mt-1 line-clamp-1">Billing summary</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </main>
    </div>
  )
}