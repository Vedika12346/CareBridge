'use client'

import { Button } from '@/app/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Avatar, AvatarFallback } from '@/app/components/ui/avtar' // Fixed typo: 'avtar' to 'avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs'
import Link from 'next/link'
import { useState } from 'react'
import {
  Plus,
  LogOut,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  Camera,
  FileText,
} from 'lucide-react'

export default function CaregiverDashboard() {
  const caregiverName = 'Caregiver'
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'pending'>('today')

  const mockChildren = [
    { id: 'child-1', firstName: 'Emma', lastName: 'Doe', age: 3, status: 'present' },
    { id: 'child-2', firstName: 'Liam', lastName: 'Doe', age: 5, status: 'present' },
    { id: 'child-3', firstName: 'Sophia', lastName: 'Johnson', age: 4, status: 'absent' },
  ]

  const mockTasks = [
    { id: 'task-1', childId: 'child-1', type: 'Log Activity', description: 'Log morning meal for Emma', time: '9:30 AM', completed: true },
    { id: 'task-2', childId: 'child-1', type: 'Take Photos', description: 'Take photos of outdoor play time', time: '2:00 PM', completed: false },
    { id: 'task-3', childId: 'child-2', type: 'Update Wellness', description: 'Log lunch and nap time for Liam', time: '12:30 PM', completed: true },
  ]

  return (
    <div className="min-h-screen w-full bg-zinc-50 text-zinc-900 flex flex-col items-center justify-start antialiased">
      
      {/* Top Header Navigation Panel */}
      <header className="w-full border-b border-purple-100 bg-white sticky top-0 z-40 shadow-sm">
        <div className="w-full px-4 sm:px-6 lg:px-12 py-4">
          {/* Changed to flex-col on mobile, flex-row on sm screens up to avoid button/text clipping */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center max-w-[1600px] mx-auto">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-zinc-900">
                Dashboard
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
                Welcome back, <span className="text-purple-700 font-black">{caregiverName}</span>!
              </p>
            </div>

            {/* Added container rule to let button span full width on tiny screens if pushed */}
            <div className="w-full sm:w-auto flex justify-end">
              <Button
                variant="outline"
                size="default"
                onClick={() => (window.location.href = '/auth/login')}
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
        
        {/* Metrics Panel Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 w-full">
          {/* Children Present Card */}
          <Card className="border-t-4 border-t-purple-600 bg-white shadow-md shadow-purple-100/40 border-x-purple-100 border-b-purple-100 w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-widest font-black text-purple-700 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Children Present
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl sm:text-4xl font-black text-zinc-900">2</p>
              <p className="text-xs text-zinc-500 mt-1">out of 3 enrolled today</p>
            </CardContent>
          </Card>

          {/* Activities Logged Card */}
          <Card className="border-t-4 border-t-purple-400 bg-white shadow-md shadow-purple-100/40 border-x-purple-100 border-b-purple-100 w-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-widest font-black text-purple-500 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Activities Logged
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl sm:text-4xl font-black text-zinc-900">8</p>
              <p className="text-xs text-zinc-500 mt-1">tracked milestones today</p>
            </CardContent>
          </Card>

          {/* Pending Tasks Card */}
          <Card className="border-t-4 border-t-amber-500 bg-white shadow-md shadow-purple-100/40 border-x-purple-100 border-b-purple-100 w-full sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs uppercase tracking-widest font-black text-amber-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 animate-pulse text-amber-600" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl sm:text-4xl font-black text-amber-700">1</p>
              <p className="text-xs text-amber-600 font-bold mt-1">immediate attention required</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Panel */}
        <div className="w-full">
          <h2 className="text-lg sm:text-xl font-black tracking-tight mb-4 text-zinc-900">
            Quick Actions
          </h2>
          {/* Adjusted gap spacing and responsive paddings inside action items */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full">
            <Link href="/dashboard/caregiver/log-activity" className="block w-full">
              <Card className="shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer bg-white group border border-purple-100 h-full">
                <CardContent className="pt-4 pb-4 sm:pt-6 sm:pb-6 text-center flex flex-col justify-center items-center">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform border border-purple-100">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <p className="font-bold text-[11px] sm:text-xs tracking-wide text-zinc-800 group-hover:text-purple-700 transition-colors">
                    Log Activity
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Card className="shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer bg-white group border border-purple-100">
              <CardContent className="pt-4 pb-4 sm:pt-6 sm:pb-6 text-center flex flex-col justify-center items-center">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform border border-purple-100">
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <p className="font-bold text-[11px] sm:text-xs tracking-wide text-zinc-800 group-hover:text-purple-700 transition-colors">
                  Upload Photos
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:shadow-md hover:border-purple-300 transition-all cursor-pointer bg-white group border border-purple-100">
              <CardContent className="pt-4 pb-4 sm:pt-6 sm:pb-6 text-center flex flex-col justify-center items-center">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform border border-purple-100 text-sm sm:text-base">
                  ❤️
                </div>
                <p className="font-bold text-[11px] sm:text-xs tracking-wide text-zinc-800 group-hover:text-purple-700 transition-colors">
                  Record Wellness
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm hover:border-purple-300 transition-all cursor-pointer bg-white group border border-purple-100">
              <CardContent className="pt-4 pb-4 sm:pt-6 sm:pb-6 text-center flex flex-col justify-center items-center">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl bg-zinc-50 text-zinc-500 flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-105 transition-transform border border-zinc-200 text-sm sm:text-base">
                  🔔
                </div>
                <p className="font-bold text-[11px] sm:text-xs tracking-wide text-zinc-800">
                  Notifications
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dynamic Framework Splits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full items-start">
          
          {/* Attendance Profiles Component */}
          <Card className="w-full lg:col-span-1 bg-white border border-purple-100 shadow-md shadow-purple-100/40">
            <CardHeader>
              <CardTitle className="font-black tracking-tight text-zinc-900 text-lg">Children Present</CardTitle>
              <CardDescription className="text-zinc-500">Active profile monitoring rosters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockChildren
                .filter((c) => c.status === 'present')
                .map((child, idx) => (
                  /* Changed layout to always keep avatar, text and badge nicely proportional using flex-shrink controls */
                  <div key={child.id} className="flex flex-row items-center justify-between gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100 shadow-sm w-full">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="border border-purple-100 h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0">
                        <AvatarFallback className={`font-black text-xs ${idx % 2 === 0 ? 'bg-purple-100 text-purple-700' : 'bg-purple-50 text-purple-600'}`}>
                          {child.firstName[0]}{child.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="font-bold text-sm tracking-tight text-zinc-800 truncate">
                          {child.firstName} {child.lastName[0]}.
                        </p>
                        <p className="text-xs text-zinc-500">{child.age} years old</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-black text-[10px] tracking-widest uppercase px-2 py-0.5 sm:px-2.5 sm:py-1 flex-shrink-0">
                      Active
                    </Badge>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Filter System Content Stream */}
          <div className="w-full lg:col-span-2">
            <Card className="w-full bg-white border border-purple-100 shadow-md shadow-purple-100/40">
              <CardHeader>
                <CardTitle className="font-black tracking-tight text-zinc-900 text-lg">Daily Tasks</CardTitle>
                <CardDescription className="text-zinc-500">Parent transparent timeline synchronization</CardDescription>
              </CardHeader>
              {/* Reduced side margins on extreme small viewports */}
              <CardContent className="w-full px-3 sm:px-6">
                <Tabs value={selectedFilter} onValueChange={(v) => setSelectedFilter(v as 'all' | 'today' | 'pending')} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-5 bg-zinc-100 p-1 rounded-xl border border-zinc-200/60">
                    <TabsTrigger value="today" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white font-black text-[11px] sm:text-xs transition-all rounded-lg py-2">Today</TabsTrigger>
                    <TabsTrigger value="pending" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white font-black text-[11px] sm:text-xs transition-all rounded-lg py-2">Pending</TabsTrigger>
                    <TabsTrigger value="all" className="data-[state=active]:bg-purple-700 data-[state=active]:text-white font-black text-[11px] sm:text-xs transition-all rounded-lg py-2">All Tasks</TabsTrigger>
                  </TabsList>

                  <TabsContent value={selectedFilter} className="space-y-4 mt-4 w-full">
                    {mockTasks.map((task) => (
                      <div key={task.id} className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all w-full ${task.completed ? 'bg-zinc-50/70 border-zinc-200 opacity-60' : 'bg-white border-l-4 border-l-amber-500 border-y-purple-100 border-r-purple-100 shadow-sm'}`}>
                        <div className="flex items-start gap-3.5 flex-1 min-w-0">
                          <div className="flex-shrink-0 pt-0.5">
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-amber-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-black text-sm tracking-tight ${task.completed ? 'line-through text-zinc-400' : 'text-zinc-900'}`}>
                              {task.type}
                            </p>
                            <p className="text-xs text-zinc-500 mt-1 leading-relaxed break-words">{task.description}</p>
                            <p className="text-[11px] font-bold text-zinc-400 mt-2.5 flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-purple-600" />
                              {task.time}
                            </p>
                          </div>
                        </div>

                        {!task.completed && (
                          <div className="w-full sm:w-auto flex justify-end flex-shrink-0">
                            <Link href={`/dashboard/caregiver/task/${task.id}`} className="w-full sm:w-auto">
                              <Button size="sm" className="w-full sm:w-auto gap-1 bg-purple-600 text-white hover:bg-purple-700 font-bold text-xs shadow-sm rounded-lg px-4 py-2">
                                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                                Complete Task
                              </Button>
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  )
}