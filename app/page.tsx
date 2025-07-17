"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  BookOpen,
  Heart,
  Briefcase,
  ShieldCheck,
  Lightbulb,
  ToggleRight,
  Youtube,
  FileText,
  EyeOff,
  Lock,
  Sparkles,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react"
import { LoadingOverlay } from "@/components/loading-overlay"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import { FeatureCarousel } from "@/components/feature-carousel"
import { CursorEffect } from "@/components/cursor-effect"
import { QuoteCarousel } from "@/components/quote-carousel"
import { ReviewCarousel } from "@/components/review-carousel"
import { DynamicGradientText } from "@/components/dynamic-gradient-text"
import { useActionState } from "react"
import { signIn, signUp } from "@/app/auth/actions"

// Mock data for reviews
const reviews = [
  {
    name: "Alice Johnson",
    rating: 5,
    text: "HumanCache has revolutionized how I learn and retain information. No more lost insights!",
    emoji: "🧠",
    profile: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Bob Williams",
    rating: 4,
    text: "The summarization feature is a game-changer. I can quickly revisit key points from long videos.",
    emoji: "✨",
    profile: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Charlie Brown",
    rating: 5,
    text: "Privacy was my main concern, and HumanCache delivers. I love being in control of my data.",
    emoji: "🔐",
    profile: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Diana Miller",
    rating: 5,
    text: "The emotional tone tracking is surprisingly insightful. It helps me understand my reactions better.",
    emoji: "❤️",
    profile: "/placeholder.svg?height=64&width=64",
  },
  {
    name: "Eve Davis",
    rating: 4,
    text: "Flashcards from my own content? Genius! It's made studying so much more effective.",
    emoji: "💡",
    profile: "/placeholder.svg?height=64&width=64",
  },
]

// Benefits data with icons
const benefits = [
  {
    title: "Boost Learning & Retention",
    description:
      "Effortlessly capture key insights from online courses, documentaries, and articles. HumanCache summarizes complex information into digestible notes, making revision a breeze and ensuring you truly retain what you learn.",
    icon: Brain,
  },
  {
    title: "Never Miss a Quote or Idea",
    description:
      "Whether it's a profound quote in a book, a brilliant idea in a podcast, or a crucial detail in a meeting, HumanCache ensures nothing slips through the cracks. It's your personal, searchable vault of inspiration.",
    icon: BookOpen,
  },
  {
    title: "Enhance Emotional Awareness",
    description:
      "Beyond just facts, HumanCache helps you track emotional tones and personal reflections tied to your digital experiences. Understand your reactions, moods, and growth over time with intuitive journaling tools.",
    icon: Heart,
  },
  {
    title: "Streamline Research & Work",
    description:
      "For professionals and researchers, HumanCache acts as an intelligent assistant. Automatically summarize long reports, transcribe important calls, and organize project-related content, saving hours of manual effort.",
    icon: Briefcase,
  },
  {
    title: "Privacy-First Control",
    description:
      "Your data is yours. HumanCache only records when you explicitly toggle it ON, giving you complete control over what's captured. Enjoy peace of mind knowing your personal memories are secure and private.",
    icon: ShieldCheck,
  },
  {
    title: "Personalized Learning Recall",
    description:
      "Transform your captured memories into flashcards and quizzes. HumanCache helps you actively recall information, reinforcing your learning and turning passive consumption into active knowledge acquisition.",
    icon: Lightbulb,
  },
]

// Mock data for interactive demo
const demoMemory = {
  title: "Understanding Quantum Physics in 10 Minutes",
  transcript: `
    [0:00] Welcome to a quick dive into quantum physics.
    [0:05] At its core, quantum physics studies matter and energy at the most fundamental level.
    [0:15] Unlike classical physics, which describes the world at macroscopic scales, quantum mechanics deals with the very small: atoms and subatomic particles.
    [0:25] One of the most famous concepts is wave-particle duality. Particles like electrons can behave as both particles and waves.
    [0:35] This is where things get weird. The act of observation can actually change the outcome of an experiment. This is known as the observer effect.
    [0:45] Another key idea is quantum entanglement, where two particles become linked and share the same fate, no matter how far apart they are.
    [0:55] Einstein famously called this "spooky action at a distance."
    [1:05] Quantum computing leverages these principles to solve problems impossible for classical computers.
    [1:15] It's a field with immense potential, from drug discovery to breaking encryption.
    [1:25] While complex, understanding these basics opens up a new way of looking at the universe.
    [1:30] Thanks for watching!
  `,
  quotes: [
    { text: "The act of observation can actually change the outcome of an experiment.", timestamp: "0:35" },
    { text: "Einstein famously called this 'spooky action at a distance.'", timestamp: "0:55" },
  ],
  moods: [
    { emoji: "🤔", timestamp: "0:15", description: "Confused by complexity" },
    { emoji: "🤯", timestamp: "0:35", description: "Mind-blown by observer effect" },
    { emoji: "🤩", timestamp: "1:05", description: "Excited by quantum computing potential" },
  ],
}

export default function LandingPage() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false)
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const router = useRouter()

  const { scrollYProgress } = useScroll()
  // Adjusted scroll range for "How It Works" to ensure it's visible earlier and stays visible
  const howItWorksScale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1])
  const howItWorksOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

  // useActionState for login form
  const [loginState, loginAction, isLoginPending] = useActionState(signIn, {
    success: false,
    message: "",
  })

  // useActionState for signup form
  const [signupState, signupAction, isSignupPending] = useActionState(signUp, {
    success: false,
    message: "",
  })

  useEffect(() => {
    // Simulate initial page load
    const timer = setTimeout(() => {
      setIsLoadingPage(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <LoadingOverlay />
      <CursorEffect />
      <div className="flex flex-col min-h-screen bg-transparent text-foreground relative z-10 font-body">
        {/* Hero Section */}
        <section className="relative w-full py-24 md:py-32 lg:py-48 text-center text-white overflow-hidden">
          <div className="relative z-10 container px-4 md:px-6">
            <DynamicGradientText
              text="HumanCache"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              gradientColors={["#8A2BE2", "#FF00FF", "#00FFFF"]} // BlueViolet, Magenta, Cyan
            />
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-primary-foreground/80"
            >
              A privacy-first AI tool that captures your digital screen experiences, transcribes, summarizes, and helps
              you remember everything.
            </motion.p>
            <FeatureCarousel />
            <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
              <DialogTrigger asChild>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                >
                  <Button
                    size="lg"
                    className="mt-10 relative overflow-hidden group bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg px-8 py-3 rounded-full"
                    data-interactive
                  >
                    <span className="relative z-10">Start Remembering</span>
                    <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-card/80 backdrop-blur-lg text-card-foreground border-primary/20 shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl">Welcome to HumanCache</DialogTitle>
                  <DialogDescription>Login or create an account to get started.</DialogDescription>
                </DialogHeader>
                <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-muted/50">
                    <TabsTrigger
                      value="login"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Login
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="space-y-4 pt-4">
                    <form action={loginAction} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email-login">Email</Label>
                        <Input
                          id="email-login"
                          name="email"
                          type="email"
                          placeholder="m@example.com"
                          className="bg-input/20 border-primary/30 focus-visible:ring-primary"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-login">Password</Label>
                        <Input
                          id="password-login"
                          name="password"
                          type="password"
                          className="bg-input/20 border-primary/30 focus-visible:ring-primary"
                          required
                        />
                      </div>
                      {loginState?.message && <p className="text-sm text-destructive">{loginState.message}</p>}
                      <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={isLoginPending}
                      >
                        {isLoginPending ? "Logging in..." : "Login"}
                      </Button>
                    </form>
                  </TabsContent>
                  <TabsContent value="signup" className="space-y-4 pt-4">
                    <form action={signupAction} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email-signup">Email</Label>
                        <Input
                          id="email-signup"
                          name="email"
                          type="email"
                          placeholder="m@example.com"
                          className="bg-input/20 border-primary/30 focus-visible:ring-primary"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password-signup">Password</Label>
                        <Input
                          id="password-signup"
                          name="password"
                          type="password"
                          className="bg-input/20 border-primary/30 focus-visible:ring-primary"
                          required
                        />
                      </div>
                      {signupState?.message && <p className="text-sm text-destructive">{signupState.message}</p>}
                      <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        disabled={isSignupPending}
                      >
                        {isSignupPending ? "Signing up..." : "Sign Up"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
            <QuoteCarousel /> {/* New Quote Carousel component */}
          </div>
        </section>

        {/* How It Works Section */}
        <motion.section
          style={{ scale: howItWorksScale, opacity: howItWorksOpacity }}
          className="w-full py-16 md:py-24 bg-transparent text-foreground overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-16 text-primary-foreground">
              How It Works: Your Digital Memory Unlocked
            </h2>
            <div className="relative flex flex-col items-center">
              {/* Vertical Timeline Line */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-primary/20 rounded-full hidden md:block"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                style={{ originY: 0 }}
              ></motion.div>

              <div className="grid md:grid-cols-2 gap-12 md:gap-24 w-full max-w-4xl">
                {/* Step 1 */}
                <motion.div
                  className="flex flex-col items-center md:items-end text-center md:text-right relative"
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  <div className="absolute md:left-full md:ml-6 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-2 border-primary-foreground z-10 hidden md:block"></div>
                  <ToggleRight className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-semibold font-heading mb-2">1. You Toggle ON</h3>
                  <p className="text-muted-foreground">
                    HumanCache is always under your control. Simply toggle it ON when you want to capture your digital
                    experience.
                  </p>
                </motion.div>
                <div></div> {/* Empty div for grid alignment */}
                {/* Step 2 */}
                <div></div> {/* Empty div for grid alignment */}
                <motion.div
                  className="flex flex-col items-center md:items-start text-center md:text-left relative"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  <div className="absolute md:right-full md:mr-6 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-2 border-primary-foreground z-10 hidden md:block"></div>
                  <Youtube className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-semibold font-heading mb-2">2. Experience & Consume</h3>
                  <p className="text-muted-foreground">
                    Watch insightful YouTube videos, read powerful articles, engage in chats, or enjoy a movie.
                    HumanCache passively observes.
                  </p>
                </motion.div>
                {/* Step 3 */}
                <motion.div
                  className="flex flex-col items-center md:items-end text-center md:text-right relative"
                  initial={{ opacity: 0, x: -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                >
                  <div className="absolute md:left-full md:ml-6 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-2 border-primary-foreground z-10 hidden md:block"></div>
                  <FileText className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-semibold font-heading mb-2">3. AI Records & Transcribes</h3>
                  <p className="text-muted-foreground">
                    Our privacy-first AI captures video titles, transcribes dialogues, extracts text from articles and
                    chats, all locally on your device.
                  </p>
                </motion.div>
                <div></div> {/* Empty div for grid alignment */}
                {/* Step 4 */}
                <div></div> {/* Empty div for grid alignment */}
                <motion.div
                  className="flex flex-col items-center md:items-start text-center md:text-left relative"
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                >
                  <div className="absolute md:right-full md:mr-6 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border-2 border-primary-foreground z-10 hidden md:block"></div>
                  <Sparkles className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-2xl font-semibold font-heading mb-2">4. Smart Summaries & Insights</h3>
                  <p className="text-muted-foreground">
                    The captured data is transformed into smart summaries, searchable memory units, emotional insights,
                    and extracted quotes, organized chronologically.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Benefits / Features Section */}
        <section className="w-full py-16 md:py-24 bg-transparent text-foreground">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-primary-foreground">
              Why HumanCache Feels Like Magic
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -30 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                  // Moved whileHover and transition to this motion.div
                  whileHover={{ scale: 1.03, boxShadow: "0 0 40px rgba(100, 100, 255, 0.6)", rotateZ: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="group cursor-pointer" // Keep these classes on the motion.div
                >
                  <Card
                    className="bg-card/80 backdrop-blur-lg text-card-foreground p-6 border border-primary/10 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-primary/30 hover:border-primary/50"
                    data-interactive
                  >
                    <CardHeader className="p-0 mb-4 flex flex-row items-center gap-4">
                      <benefit.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                      <CardTitle className="text-xl font-semibold font-heading">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Live User Reviews Section */}
        <section className="w-full py-16 md:py-24 bg-transparent text-foreground">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-primary-foreground">
              What it feels like to finally remember.
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <ReviewCarousel reviews={reviews} /> {/* Use the new ReviewCarousel component */}
            </motion.div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="w-full py-16 md:py-24 bg-transparent text-foreground">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-primary-foreground">
              Interactive Demo: Relive Your Digital Journey
            </h2>
            <motion.div
              className="bg-card/80 backdrop-blur-lg border border-primary/10 rounded-xl p-6 md:p-10 shadow-2xl max-w-4xl mx-auto relative overflow-hidden group cursor-none"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              data-interactive
              whileHover={{ boxShadow: "0 0 50px rgba(100, 100, 255, 0.8)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-heading font-semibold mb-4 text-primary-foreground">{demoMemory.title}</h3>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Quantum Physics Book Image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="flex justify-center md:justify-end"
                  >
                    <img
                      src="/placeholder.svg?height=300&width=200"
                      alt="Quantum Physics Book"
                      className="rounded-lg shadow-lg border border-primary/20"
                    />
                  </motion.div>
                  {/* Summary & Insights */}
                  <div>
                    <motion.h4
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="text-xl font-semibold mb-3 text-primary"
                    >
                      Summarized by HumanCache: Effortless Understanding
                    </motion.h4>
                    <div className="max-h-60 overflow-y-auto text-muted-foreground text-sm custom-scrollbar pr-2 mb-4">
                      {demoMemory.transcript.split("\n").map((line, idx) => (
                        <p key={idx} className="mb-1">
                          {line}
                        </p>
                      ))}
                    </div>
                    <h4 className="text-xl font-semibold mb-3 text-primary">Extracted Insights</h4>
                    <div className="space-y-4">
                      {demoMemory.quotes.map((q, idx) => (
                        <div key={idx} className="bg-muted/30 p-3 rounded-lg border border-primary/20">
                          <p className="text-primary-foreground italic">"{q.text}"</p>
                          <p className="text-xs text-muted-foreground mt-1">Timestamp: {q.timestamp}</p>
                        </div>
                      ))}
                      {demoMemory.moods.map((m, idx) => (
                        <div
                          key={idx}
                          className="bg-muted/30 p-3 rounded-lg border border-primary/20 flex items-center gap-2"
                        >
                          <span className="text-2xl">{m.emoji}</span>
                          <div>
                            <p className="text-primary-foreground">{m.description}</p>
                            <p className="text-xs text-muted-foreground">Timestamp: {m.timestamp}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Privacy & Philosophy Section */}
        <section className="w-full py-16 md:py-24 bg-transparent text-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8 text-primary-foreground">
              Your Thoughts. Your Rules.
            </h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground mb-12">
              HumanCache is built on a foundation of unwavering privacy. We believe your digital memories are personal,
              and you should always have complete control.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <motion.div
                className="flex flex-col items-center p-6 bg-card/80 backdrop-blur-lg rounded-xl border border-primary/10 shadow-lg"
                initial={{ opacity: 0, y: 50, rotateY: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              >
                <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold font-heading mb-2">Full User Control</h3>
                <p className="text-sm text-muted-foreground">You decide what, when, and how is captured.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center p-6 bg-card/80 backdrop-blur-lg rounded-xl border border-primary/10 shadow-lg"
                initial={{ opacity: 0, y: 50, rotateY: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              >
                <Lock className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold font-heading mb-2">Data Stays Local</h3>
                <p className="text-sm text-muted-foreground">Your memories are stored securely on your device.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center p-6 bg-card/80 backdrop-blur-lg rounded-xl border border-primary/10 shadow-lg"
                initial={{ opacity: 0, y: 50, rotateY: 30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                <ToggleRight className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold font-heading mb-2">Toggle On/Off</h3>
                <p className="text-sm text-muted-foreground">Activate capture only when you need it.</p>
              </motion.div>
              <motion.div
                className="flex flex-col items-center p-6 bg-card/80 backdrop-blur-lg rounded-xl border border-primary/10 shadow-lg"
                initial={{ opacity: 0, y: 50, rotateY: 30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              >
                <EyeOff className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold font-heading mb-2">No Cloud Sync (Optional)</h3>
                <p className="text-sm text-muted-foreground">Your data never leaves your device without consent.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Visual Showcase Section */}
        <section className="w-full py-16 md:py-24 bg-transparent text-foreground">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12 text-primary-foreground">
              See HumanCache in Action
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                className="relative rounded-xl overflow-hidden border border-primary/20 shadow-2xl group"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Timeline Memory Screenshot"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-2xl font-semibold font-heading">Timeline Memory</p>
                </div>
              </motion.div>
              <motion.div
                className="relative rounded-xl overflow-hidden border border-primary/20 shadow-2xl group"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Quote Archive Screenshot"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-2xl font-semibold font-heading">Quote Archive</p>
                </div>
              </motion.div>
              <motion.div
                className="relative rounded-xl overflow-hidden border border-primary/20 shadow-2xl group"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Mood Map Screenshot"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-2xl font-semibold font-heading">Mood Map</p>
                </div>
              </motion.div>
              <motion.div
                className="relative rounded-xl overflow-hidden border border-primary/20 shadow-2xl group"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              >
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Toggle On/Off Screen"
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-2xl font-semibold font-heading">Toggle On/Off</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call To Action Section */}
        <motion.section
          className="w-full py-16 md:py-24 bg-gradient-to-br from-background to-gray-950 text-foreground text-center border-t border-primary/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="container px-4 md:px-6 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-primary-foreground">
              Ready to unlock your full memory potential?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our private beta and be among the first to experience HumanCache. Limited spots available!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Input
                type="email"
                placeholder="Enter your email to join waitlist"
                className="max-w-sm w-full bg-input/20 border-primary/30 focus-visible:ring-primary text-primary-foreground placeholder:text-muted-foreground"
              />
              <Button
                size="lg"
                className="relative overflow-hidden group bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold text-lg px-8 py-3 rounded-full"
                data-interactive
              >
                <span className="relative z-10">Join Private Beta</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer
          className="w-full py-8 bg-gray-950/80 text-gray-400 text-center text-sm border-t border-primary/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
              <nav className="space-x-4 mb-4 md:mb-0">
                <Link href="#" className="hover:text-white transition-colors duration-300">
                  About
                </Link>
                <Link href="#" className="hover:text-white transition-colors duration-300">
                  Privacy
                </Link>
                <Link href="#" className="hover:text-white transition-colors duration-300">
                  Contact
                </Link>
                <Link href="#" className="hover:text-white transition-colors duration-300">
                  Docs
                </Link>
              </nav>
              <div className="text-primary-foreground italic">
                "Memory is the diary that we all carry about with us."
              </div>
            </div>
            <p>&copy; {new Date().getFullYear()} HumanCache. All rights reserved.</p>
            <div className="flex justify-center gap-6 mt-4">
              <Link href="#" aria-label="GitHub" data-interactive>
                <Github className="h-6 w-6 text-gray-400 hover:text-white transition-colors duration-300" />
              </Link>
              <Link href="#" aria-label="Twitter" data-interactive>
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white transition-colors duration-300" />
              </Link>
              <Link href="#" aria-label="LinkedIn" data-interactive>
                <Linkedin className="h-6 w-6 text-gray-400 hover:text-white transition-colors duration-300" />
              </Link>
            </div>
          </div>
        </motion.footer>
      </div>
    </>
  )
}
