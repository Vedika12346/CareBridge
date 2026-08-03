'use client'

import Link from 'next/link'
import { useAuth } from '@/lib/auth-context'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/app/components/ui/button'
import { motion, Variants } from 'framer-motion'
// Import the new Navbar component here (update path if needed)
import Navbar from '@/app/components/ui/navbar' 
import { 
  Video, 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Lock,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  Clock
} from 'lucide-react'

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'parents' | 'sitters' | 'admins'>('parents')
  
  // Form States
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (user && !isLoading) {
      router.push(`/dashboard/${user.role.toLowerCase()}`)
    }
  }, [user, isLoading, router])

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && message) {
      setSubmitted(true)
      setEmail('')
      setMessage('')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-background flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10 px-4">
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-primary mb-4 mx-auto"></div>
          <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground animate-pulse">
            Connecting Nodes...
          </p>
        </div>
      </div>
    )
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground antialiased overflow-x-hidden relative flex flex-col justify-between">
      
      {/* Dynamic navbar component import replacement */}
      <Navbar />

      {/* Main Content */}
      <div className="w-full relative z-10 flex-1">
        
        {/* Hero Section */}
        <section className="w-full px-4 sm:px-8 lg:px-16 pt-16 pb-20 border-b border-border">
          <div className="w-full max-w-[1600px] mx-auto text-left lg:grid lg:grid-cols-12 lg:gap-12 lg:items-center">
            
            <motion.div 
              className="lg:col-span-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] mb-6 text-foreground">
                The Trust Bridge Between <br />
                <span className="text-primary">
                  Parents & Babysitters
                </span>
              </h1>

              <p className="text-base sm:text-xl text-muted-foreground font-normal max-w-2xl mb-8 leading-relaxed">
                CareBridge eliminates the anxiety of child care. We link busy parents with verified, professional babysitters and caretakers through real-time visibility, smart tracking, and secure media sharing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mb-12">
                <Link href="/auth/register" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group transition-all px-8 py-6 rounded-[var(--radius)]">
                    Find Your Ideal Sitter
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Visual Card Section with a dynamic placeholder baby context image */}
            <motion.div 
              className="hidden lg:block lg:col-span-6 border border-border p-5 rounded-[var(--radius)] bg-card shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="flex justify-between items-center pb-3 border-b border-border mb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">SECURE LIVE FEED PREVIEW</span>
                </div>
                <div className="text-xs font-bold text-secondary">Verified Sync Protocol</div>
              </div>
              <div className="aspect-video w-full rounded-[var(--radius)] border border-border overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80" 
                  alt="A happy baby playing outdoors, illustrating CareBridge app monitoring streams" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-mono font-bold text-foreground bg-card/90 px-2 py-0.5 rounded border border-border">
                    Playroom Cam • Real-Time Safety Verified
                  </span>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* System Features Grid */}
        <section id="features" className="w-full px-4 sm:px-8 lg:px-16 py-24 bg-muted/20">
          <div className="w-full max-w-[1600px] mx-auto">
            <div className="text-left mb-16">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-3 text-foreground">Platform Features</h2>
              <p className="text-muted-foreground max-w-2xl">Intuitive, feature-rich workflows designed explicitly to keep your little ones safely connected.</p>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {/* Feature 1: Video */}
              <motion.div variants={itemVariants} className="lg:col-span-6 bg-card border border-border hover:border-primary/50 p-8 rounded-[var(--radius)] transition-all flex flex-col justify-between min-h-[200px]">
                <div className="h-12 w-12 rounded-[var(--radius)] bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <Video className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight text-foreground">Live Streaming Check-ins</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Check up on your child seamlessly with crystal-clear peer-to-peer live streams initiated securely from the sitter&apos;s mobile dashboard.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2: Milestone Photos */}
              <motion.div variants={itemVariants} className="lg:col-span-6 bg-card border border-border hover:border-secondary/50 p-8 rounded-[var(--radius)] transition-all flex flex-col justify-between min-h-[200px]">
                <div className="h-12 w-12 rounded-[var(--radius)] bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 tracking-tight text-foreground">Daily Activity Logs & Photos</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Babysitters record activities, meals, and naps while sending instant photo updates directly to the family feed.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3: Wellness Metrics */}
              <motion.div variants={itemVariants} className="lg:col-span-4 bg-card border border-border hover:border-accent/50 p-8 rounded-[var(--radius)] transition-all flex flex-col justify-between">
                <div className="h-12 w-12 rounded-[var(--radius)] bg-accent/10 text-accent flex items-center justify-center mb-6">
                  <Heart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 tracking-tight text-foreground">Wellness Oversight</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Log dietary preferences, medication notifications, allergies, and accurate routine records safely.
                  </p>
                </div>
              </motion.div>

              {/* Feature 4: Role Isolation */}
              <motion.div variants={itemVariants} className="lg:col-span-4 bg-card border border-border hover:border-primary/50 p-8 rounded-[var(--radius)] transition-all flex flex-col justify-between">
                <div className="h-12 w-12 rounded-[var(--radius)] bg-primary/10 text-primary flex items-center justify-center mb-6">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 tracking-tight text-foreground">Role-Isolated Interfaces</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Custom workspaces engineered explicitly for what parents need to track versus what sitters need to log quickly.
                  </p>
                </div>
              </motion.div>

              {/* Feature 5: Shift Scheduler */}
              <motion.div variants={itemVariants} className="lg:col-span-4 bg-card border border-border hover:border-secondary/50 p-8 rounded-[var(--radius)] transition-all flex flex-col justify-between">
                <div className="h-12 w-12 rounded-[var(--radius)] bg-secondary/10 text-secondary flex items-center justify-center mb-6">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 tracking-tight text-foreground">Booking & Scheduling</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    Easily structure timeframes, repeat routines, check calendar assignments, and clock work durations.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Dynamic Portal View Selector */}
        <section id="portals" className="w-full px-4 sm:px-8 lg:px-16 py-24 border-b border-border">
          <div className="w-full max-w-[1600px] mx-auto">
            <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
              
              <div className="lg:col-span-4 mb-8 lg:mb-0 text-left">
                <h2 className="text-3xl font-black tracking-tight mb-4 text-foreground">Interactive Portals</h2>
                <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                  See how controls adjust dynamically depending on the type of active user logged into CareBridge.
                </p>
                <div className="flex flex-col gap-2">
                  {(['parents', 'sitters', 'admins'] as const).map((role) => (
                    <button
                      key={role}
                      onClick={() => setActiveTab(role)}
                      className={`w-full text-left px-4 py-3 rounded-[var(--radius)] font-bold capitalize transition-all border ${
                        activeTab === role 
                          ? 'bg-primary text-primary-foreground border-primary shadow-md shadow-primary/10' 
                          : 'bg-card text-muted-foreground border-border hover:bg-muted'
                      }`}
                    >
                      {role === 'sitters' ? 'Babysitter View' : `${role} Dashboard`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-8 bg-card border border-border p-8 rounded-[var(--radius)] min-h-[300px] flex flex-col justify-between text-left">
                {activeTab === 'parents' && (
                  <div>
                    <h3 className="text-xl font-black text-primary mb-3">Parent Sanctuary</h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      A central hub giving parents real-time reassurance. Monitor continuous active streams, read logged habits, and track historical metrics.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                      <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-accent" /> Encrypted Video Tokens</li>
                      <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-accent" /> Sitter Activity Logs</li>
                      <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-accent" /> Real-time SMS Emergency Triggers</li>
                      <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-accent" /> Routine Timeline Tracking</li>
                    </ul>
                  </div>
                )}
                {activeTab === 'sitters' && (
                  <div>
                    <h3 className="text-xl font-black text-secondary mb-3">Caretaker Control Panel</h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      A lightweight, distraction-free layout optimizing classroom or private residential child tracking processes without complex software lag.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                      <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-secondary" /> Rapid Photo Capture Upload</li>
                      <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-secondary" /> Feeding & Sleeping Counters</li>
                      <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-secondary" /> Parent Communication Channels</li>
                      <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-secondary" /> Shift Clocking System</li>
                    </ul>
                  </div>
                )}
                {activeTab === 'admins' && (
                  <div>
                    <h3 className="text-xl font-black text-foreground mb-3">Safety & Trust Console</h3>
                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                      Global operations console monitoring server configurations, background check expirations, and cross-party authentication integrity.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                      <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary" /> Identity Verification Check Logs</li>
                      <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary" /> Feed Provision Audit Trails</li>
                      <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary" /> Network Analytics Summary</li>
                      <li className="flex items-center gap-2 text-muted-foreground"><CheckCircle2 className="h-4 w-4 text-primary" /> Secure User Provisions</li>
                    </ul>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>

        {/* Company Core Values Section */}
        <section id="about" className="w-full px-4 sm:px-8 lg:px-16 py-24 bg-muted/10 border-b border-border">
          <div className="w-full max-w-[1600px] mx-auto text-left">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4 text-foreground">Why CareBridge?</h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Finding a caretaker is stressful, and keeping up during their shift shouldn&apos;t be a puzzle. CareBridge provides structural tools enabling real human relationships built directly around trust, care, and technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="p-6 bg-card border border-border rounded-[var(--radius)] flex flex-col gap-4">
                <div className="h-10 w-10 bg-primary/10 text-primary flex items-center justify-center rounded-[var(--radius)] shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-foreground">Fluid Dialogues</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">No missed text threads or confusing handoffs. Everything regarding meals, wellness flags, and updates lives in one beautiful interface.</p>
                </div>
              </div>

              <div className="p-6 bg-card border border-border rounded-[var(--radius)] flex flex-col gap-4">
                <div className="h-10 w-10 bg-secondary/10 text-secondary flex items-center justify-center rounded-[var(--radius)] shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-foreground">Real-Time Context</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Whether you are at work or out for dinner, get instantaneous insight exactly when milestones happen without feeling invasive.</p>
                </div>
              </div>

              <div className="p-6 bg-card border border-border rounded-[var(--radius)] flex flex-col gap-4">
                <div className="h-10 w-10 bg-accent/10 text-accent flex items-center justify-center rounded-[var(--radius)] shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1 text-foreground">Absolute Protocol Isolation</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">Your data safety reigns supreme. Stream tokens automatically expire as soon as a caregiver clicks to check out of their scheduled shift.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="w-full px-4 sm:px-8 lg:px-16 py-24">
          <div className="w-full max-w-[1600px] mx-auto text-left">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <h2 className="text-3xl font-black tracking-tight mb-2 text-foreground">Onboard Your Family</h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Have questions regarding active streaming encryption protocols, background validation filters, or setting up corporate child tracking networks? Get in touch with our team.
                  </p>
                </div>

                <div className="space-y-4 text-sm font-medium">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-5 w-5 text-primary shrink-0" />
                    <span>carebridge@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <span>862486248</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                    <span>Mumbai</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-card border border-border p-8 rounded-[var(--radius)] shadow-sm">
                {submitted ? (
                  <div className="p-6 text-center space-y-3 bg-accent/10 border border-accent/20 rounded-[var(--radius)]">
                    <CheckCircle2 className="h-8 w-8 text-accent mx-auto" />
                    <h3 className="text-lg font-bold text-foreground">Message Dispatched Successfully</h3>
                    <p className="text-xs text-muted-foreground">Our client support staff will reach out to your household dashboard profile details within 24 hours.</p>
                    <Button onClick={() => setSubmitted(false)} variant="outline" size="sm" className="mt-2 text-foreground">Send Another Message</Button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="parent@example.com"
                        className="w-full px-4 py-2.5 rounded-[var(--radius)] border border-border bg-background text-sm focus:outline-none focus:border-primary text-foreground transition-colors"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Message or Inquiry</label>
                      <textarea 
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us about your babysitting setup or how we can help keep you securely connected..."
                        className="w-full px-4 py-2.5 rounded-[var(--radius)] border border-border bg-background text-sm focus:outline-none focus:border-primary text-foreground transition-colors resize-none"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2.5 rounded-[var(--radius)] transition-all">
                      Send Support Request
                    </Button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-card/30 backdrop-blur-sm relative z-10 py-12 left-0 right-0">
        <div className="w-full px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-6 max-w-[1600px] mx-auto">
          <div className="text-center md:text-left">
            <p className="font-bold tracking-wide text-foreground">CareBridge</p>
            <p className="text-xs text-muted-foreground mt-1">Professional Sitter & Babysitter Monitoring Infrastructure</p>
            <p className="text-xs font-semibold text-primary/90 mt-2">Created by Vedika Killedar</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-1 text-xs text-muted-foreground">
            <p className="flex items-center gap-1.5 text-center md:text-right">
              <Lock className="h-3 w-3 text-primary" /> Secure Gateway Protected
            </p>
            <p>© {new Date().getFullYear()} CareBridge. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}