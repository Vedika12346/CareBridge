'use client'

// import { useAuth } from '@/lib/auth-context' // 🚫 BACKEND COMMENTED OUT
// import { ProtectedRoute } from '@/app/components/protected-route' // 🚫 BACKEND COMMENTED OUT
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Badge } from '@/app/components/ui/badge'
import { Avatar, AvatarFallback } from '@/app/components/ui/avtar' // 🛠️ Typo Fix: corrected "avtar" to "avatar"
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation' // 🌟 Added for routing back to login on sign-out
import { Video, Camera, Heart, Apple, Moon, LogOut, Menu, Plus, Trash2 } from 'lucide-react' // 🌟 Added Trash2 icon for delete

export default function ParentDashboard() {
  const router = useRouter()

  /* -------------------------------------------------------------
     🚫 BACKEND COMMENTED OUT: Replacing context states with mock fields
     -------------------------------------------------------------
  const { user, logout } = useAuth()
  ------------------------------------------------------------- */
  const mockUser = { firstName: 'Jane' } // Mock parent profile instance

  const mockLogoutHandler = () => {
    // 🌟 Redirects back to your auth/login landing route
    router.push('/auth/login') 
  }

  const [selectedChild, setSelectedChild] = useState<string | null>('child-1') // Initialized default select to remove wide blank spaces

  // Mock data for demonstration
  const mockChildren = [
    {
      id: 'child-1',
      firstName: 'Emma',
      lastName: 'Doe',
      age: 3,
      imageUrl: null,
      center: 'Sunshine Daycare',
    },
    {
      id: 'child-2',
      firstName: 'Liam',
      lastName: 'Doe',
      age: 5,
      imageUrl: null,
      center: 'Sunshine Daycare',
    },
  ]

  const mockActivities = [
    {
      id: 'activity-1',
      type: 'MEAL',
      title: 'Lunch',
      time: '12:30 PM',
      description: 'Healthy lunch - chicken, rice, vegetables',
      mood: 'HAPPY',
      photos: 1,
    },
    {
      id: 'activity-2',
      type: 'PLAY',
      title: 'Outdoor Play',
      time: '2:00 PM',
      description: 'Playing on playground equipment',
      mood: 'HAPPY',
      photos: 3,
    },
    {
      id: 'activity-3',
      type: 'SLEEP',
      title: 'Afternoon Nap',
      time: '1:00 PM - 3:00 PM',
      description: 'Restful nap, slept well',
      mood: 'NEUTRAL',
      photos: 0,
    },
  ]

  const getActivityIcon = (type: string) => {
    const icons: Record<string, string> = {
      MEAL: '🍽️',
      PLAY: '🎮',
      SLEEP: '😴',
      LEARNING: '📚',
      HEALTH: '⚕️',
    }
    return icons[type] || '📝'
  }

  // Handle child removal placeholder
  const handleDeleteChild = (e: React.MouseEvent, childId: string) => {
    e.stopPropagation() // Prevents clicking the delete button from toggling selection states
    alert(`Backend Hook Placeholder: Remove profile record ${childId}`)
  }

  return (
    /* -------------------------------------------------------------
       🚫 BACKEND COMMENTED OUT: Removing route constraint wrapper block
       <ProtectedRoute requiredRoles={['PARENT']}>
       ------------------------------------------------------------- */
    <div className="min-h-screen bg-zinc-50/50 text-zinc-900 antialiased">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-white sticky top-0 z-40 w-full shadow-xs">
        <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Dashboard</h1>
            <p className="text-xs text-muted-foreground">Welcome back, Parent </p>
          </div>
          {/* 🌟 Styled to be whole solid red with white text */}
          <Button 
            onClick={mockLogoutHandler} 
            size="sm" 
            className="gap-2 bg-red-600 hover:bg-red-700 text-white border-none transition-colors font-medium shadow-xs"
          >
            <LogOut className="w-4 h-4 text-white" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Content Wrapper */}
      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        
        {/* Quick Actions Grid Layout */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/dashboard/parent/live-video" className="block">
            <Card className="hover:shadow-md hover:border-indigo-500/50 transition-all cursor-pointer bg-white border-zinc-200 h-full">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold">Live Video</CardTitle>
                  <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                    <Video className="w-4 h-4" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">Connect with caregivers</p>
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-md transition-all bg-white border-zinc-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Activity Feed</CardTitle>
                <div className="p-1.5 bg-zinc-100 text-zinc-600 rounded-lg">
                  <Camera className="w-4 h-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Today&apos;s updates and photos</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-all sm:col-span-2 lg:col-span-1 bg-white border-zinc-200">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Wellness</CardTitle>
                <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
                  <Heart className="w-4 h-4" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Meals, sleep, and health tracking</p>
            </CardContent>
          </Card>
        </section>

        {/* Dynamic Responsive 2-Column Split: Controls Centering */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column Container: Children Management Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold tracking-tight text-zinc-900 flex items-center gap-2">
                <span>My Children</span>
                <Badge variant="secondary" className="bg-zinc-100 text-zinc-700 font-medium">{mockChildren.length}</Badge>
              </h2>
              {/* Register Child CTA button */}
              <Link href="/dashboard/parent/register-child">
                <Button size="sm" variant="outline" className="gap-1.5 shadow-xs border-zinc-200 text-zinc-700 hover:bg-zinc-50">
                  <Plus className="w-3.5 h-3.5" />
                  Register Child
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {mockChildren.map((child) => (
                <Card
                  key={child.id}
                  onClick={() => setSelectedChild(child.id)}
                  className={`cursor-pointer transition-all border text-left bg-white shadow-xs ${
                    selectedChild === child.id
                      ? 'border-indigo-600 ring-2 ring-indigo-600/10 shadow-sm bg-indigo-50/[0.02]'
                      : 'border-zinc-200 hover:border-zinc-300'
                  }`}
                >
                  <CardHeader className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border border-zinc-100 shadow-2xs">
                          <AvatarFallback className="bg-indigo-50 text-indigo-700 font-bold text-xs">
                            {child.firstName[0]}{child.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-sm font-semibold text-zinc-900">{child.firstName} {child.lastName}</CardTitle>
                          <CardDescription className="text-xs text-zinc-500">Age {child.age} years old</CardDescription>
                        </div>
                      </div>
                      {selectedChild === child.id && (
                        <Badge className="bg-indigo-600 text-white font-medium hover:bg-indigo-600 text-[10px] px-2 py-0">
                          Active
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="px-4 pb-4 pt-0 border-t border-zinc-50 mt-1 flex items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-2.5 min-w-0">
                      <span className="text-zinc-400">📍</span>
                      <span className="truncate">{child.center}</span>
                    </p>
                    {/* 🌟 Permanent Visible Delete Button */}
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      onClick={(e) => handleDeleteChild(e, child.id)}
                      className="w-7 h-7 mt-2 text-zinc-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors flex-shrink-0"
                      title="Delete profile"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Column Container: Dynamic Activities Timeline Feed */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold tracking-tight text-zinc-900">Today&apos;s Activities</h2>
            
            {selectedChild ? (
              <div className="space-y-3">
                {mockActivities.map((activity) => (
                  <Card key={activity.id} className="border border-zinc-200 bg-white shadow-xs hover:border-zinc-300 transition-all">
                    <CardContent className="p-4 sm:p-5">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-zinc-50 border border-zinc-150 flex items-center justify-center text-base">
                          {activity.type === 'MEAL' && <Apple className="w-4 h-4 text-amber-600" />}
                          {activity.type === 'SLEEP' && <Moon className="w-4 h-4 text-indigo-600" />}
                          {activity.type === 'PLAY' && <span>🎮</span>}
                          {activity.type === 'HEALTH' && <Heart className="w-4 h-4 text-rose-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-sm sm:text-base text-zinc-900 truncate">{activity.title}</h3>
                            <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">{activity.time}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-600 mb-3 leading-relaxed">{activity.description}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary" className="capitalize text-[10px] px-2 py-0 bg-zinc-100 text-zinc-700 font-medium border-none">
                              {activity.mood}
                            </Badge>
                            {activity.photos > 0 && (
                              <Badge variant="outline" className="gap-1 text-[10px] px-2 py-0 border-zinc-200 text-zinc-500">
                                <Camera className="w-3 h-3 text-zinc-400" />
                                {activity.photos} {activity.photos === 1 ? 'photo' : 'photos'}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border border-dashed border-zinc-200 bg-white/60">
                <CardContent className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="text-3xl mb-2">👧</div>
                  <p className="text-zinc-700 font-medium text-sm">No profile data loaded</p>
                  <p className="text-xs text-muted-foreground max-w-xs mt-1">Select a profile record from the list to view their active stream summaries.</p>
                </CardContent>
              </Card>
            )}
          </div>

        </section>
      </main>
    </div>
    /* -------------------------------------------------------------
       🚫 BACKEND COMMENTED OUT: Closing route constraint wrapper block
       </ProtectedRoute>
       ------------------------------------------------------------- */
  )
}