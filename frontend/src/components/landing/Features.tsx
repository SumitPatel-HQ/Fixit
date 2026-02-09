"use client"

import { motion } from "framer-motion"
import { Eye, ShieldCheck, ListChecks, Mic, BookOpen, Brain, Map, Activity, Smartphone, Globe } from "lucide-react"

const features = [
   {
      icon: Eye,
      title: "Instant Device Detection",
      description: "Upload a photo or use your camera. Our AI instantly identifies your device, locates components with AR overlays, and understands spatial relationships to pinpoint exactly what's wrong.",
      badge: "95% accuracy"
   },
   {
      icon: ShieldCheck,
      title: "Smart Safety Checks",
      description: "Built-in safety assessment detects electrical hazards, high-temperature risks, and dangerous scenarios before you start. Critical situations trigger professional help recommendations automatically.",
      badge: "Zero guesswork"
   },
   {
      icon: ListChecks,
      title: "Interactive Repair Workflows",
      description: "Get clear, actionable steps with time estimates, visual cues, and cause-effect explanations. Track your progress, mark steps complete, and listen to audio instructions hands-free.",
      badge: "Average 15 min fixes"
   },
   {
      icon: Mic,
      title: "Hands-Free Troubleshooting",
      description: "Speak your question while working on your device. Voice input and audio playback let you fix issues without constantly checking your screen—perfect when your hands are busy.",
      badge: "Multi-modal input"
   },
   {
      icon: BookOpen,
      title: "Verified Information",
      description: "Every repair step is backed by official manuals, community reports, and expert sources. Transparent attribution shows you exactly where guidance comes from, with success rates and verification.",
      badge: "Trusted sources"
   },
   {
      icon: Brain,
      title: "Context-Aware Assistance",
      description: "Ask clarifying questions as you work. The AI remembers your device, previous steps, and context to provide adaptive guidance throughout your repair journey.",
      badge: "Never stuck"
   }
]

const highlights = [
   {
      title: "AR Component Mapping",
      description: "See exactly where components are with interactive overlays and spatial reasoning",
      icon: Map
   },
   {
      title: "Cause-Effect Analysis",
      description: "Understand WHY you're doing each step and what result to expect",
      icon: Activity
   },
   {
      title: "Multi-Device Support",
      description: "From routers to laptops, printers to circuit boards—one tool for everything",
      icon: Smartphone
   },
   {
      title: "Real-Time Web Grounding",
      description: "AI searches official docs and community solutions for your specific model",
      icon: Globe
   }
]

export function Features() {
   return (
      <section id="features" className="pb-24 md:pb-32 px-4 md:px-6 relative overflow-hidden">
         {/* Subtle background glow */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

         <div className="container mx-auto max-w-8xl relative pt-24 border-t border-white/5">
            <div className="text-center mb-16 md:mb-24 space-y-4">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold uppercase tracking-wider mb-4"
               >
                  Capabilities
               </motion.div>
               <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Everything you need to <span className="text-accent">Fix</span>
               </h2>
               <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                  Stop guessing. Start fixing with AI-powered precision.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24">
               {features.map((feature, index) => (
                  <motion.div
                     key={feature.title}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.1 }}
                     viewport={{ once: true }}
                     className="group relative"
                  >
                     <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all hover:border-white/10 duration-500 h-full flex flex-col">
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-accent/5">
                           <feature.icon className="w-6 h-6 text-accent" />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white/90">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-6 flex-grow">{feature.description}</p>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase tracking-wider font-bold text-accent/80 w-fit">
                           {feature.badge}
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>

            {/* Highlights Grid */}
            <div className="pt-24 border-t border-white/5">
               <div className="text-center mb-20">
                  <h3 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                     Core <span className="text-accent">Intelligence</span>
                  </h3>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                     The advanced technology driving your repair success
                  </p>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {highlights.map((item, index) => (
                     <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] flex flex-col items-center text-center group hover:border-accent/20 transition-all duration-500"
                     >
                        <div className="p-4 rounded-2xl bg-white/5 mb-6 group-hover:bg-accent/10 group-hover:scale-110 transition-all duration-500 shadow-xl shadow-accent/5">
                           <item.icon className="w-8 h-8 text-white/60 group-hover:text-accent transition-colors" />
                        </div>
                        <h4 className="font-bold mb-3 text-lg text-white/90">{item.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                           {item.description}
                        </p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   )
}
