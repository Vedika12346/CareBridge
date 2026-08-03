'use client'

import Link from 'next/link'
import { Button } from '@/app/components/ui/button'
import { Baby } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="w-full border-b border-border sticky top-0 bg-background/80 backdrop-blur-md z-50 left-0 right-0">
      <div className="w-full px-4 sm:px-8 lg:px-16 h-20 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-[var(--radius)] bg-primary flex items-center justify-center shadow-lg shadow-primary/20 transform group-hover:rotate-6 transition-transform duration-300">
            <Baby className="text-primary-foreground h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tight text-foreground">CareBridge</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-primary transition-colors">Platform Benefits</a>
          <a href="#portals" className="hover:text-primary transition-colors">How It Works</a>
          <a href="#about" className="hover:text-primary transition-colors">Our Philosophy</a>
          <a href="#contact" className="hover:text-primary transition-colors">Get Started</a>
        </div>

        <div className="flex gap-3 items-center">
          <Link href="/auth/login">
            <Button variant="ghost" className="hover:bg-muted font-medium text-sm px-4 text-foreground">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all text-sm px-5 rounded-[var(--radius)]">
              Join Network
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}