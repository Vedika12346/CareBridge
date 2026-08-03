'use client'

import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { ProtectedRoute } from '@/app/components/protected-route'
import { Button } from '@/app/components/ui/button'
import Link from 'next/link'

export default function LogActivityPage() {
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    childId: '',
    activityType: 'MEAL',
    title: '',
    description: '',
    mood: 'HAPPY',
    startTime: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const mockChildren = [
    { id: 'child-1', name: 'Emma Doe' },
    { id: 'child-2', name: 'Liam Doe' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Activity logged:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ childId: '', activityType: 'MEAL', title: '', description: '', mood: 'HAPPY', startTime: '' })
    }, 2000)
  }

  return (
    <ProtectedRoute requiredRoles={['CAREGIVER']}>
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/dashboard/caregiver" className="text-2xl font-bold text-primary hover:opacity-80">
              CareBridge
            </Link>
            <Link href="/dashboard/caregiver">
              <Button variant="outline" size="sm">
                Back
              </Button>
            </Link>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-2">Log Activity</h1>
          <p className="text-muted-foreground mb-8">Record a new activity for a child</p>

          <form onSubmit={handleSubmit} className="bg-card rounded-lg border border-border p-8 space-y-6">
            {/* Child Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Child</label>
              <select
                value={formData.childId}
                onChange={(e) => setFormData({ ...formData, childId: e.target.value })}
                required
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a child</option>
                {mockChildren.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Activity Type */}
            <div>
              <label className="block text-sm font-medium mb-2">Activity Type</label>
              <select
                value={formData.activityType}
                onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="MEAL">Meal</option>
                <option value="SLEEP">Sleep</option>
                <option value="PLAY">Play</option>
                <option value="LEARNING">Learning</option>
                <option value="HEALTH">Health</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Morning Snack, Outdoor Play"
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Details about the activity..."
                rows={4}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Mood */}
            <div>
              <label className="block text-sm font-medium mb-2">Mood</label>
              <select
                value={formData.mood}
                onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="HAPPY">Happy 😊</option>
                <option value="NEUTRAL">Neutral 😐</option>
                <option value="UPSET">Upset 😟</option>
                <option value="CRYING">Crying 😭</option>
              </select>
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium mb-2">Start Time</label>
              <input
                type="datetime-local"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
                {submitted ? 'Activity Logged ✓' : 'Log Activity'}
              </Button>
              <Link href="/dashboard/caregiver" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </main>
      </div>
    </ProtectedRoute>
  )
}
