"use client"

import { motion } from "framer-motion"
import { Camera, Brain, Wrench, CheckCircle2, ArrowRight } from "lucide-react"

const steps = [
   {
      number: "01",
      title: "Capture",
      subtitle: "📸 Take a photo or upload an image",
      description: "Camera or file upload - Supports blurry images - Works on mobile",
      icon: Camera,
      color: "from-blue-500/20 to-cyan-500/20"
   },
   {
      number: "02",
      title: "Analyze",
      subtitle: "🤖 AI identifies and diagnoses issues",
      description: "95% accuracy - Spatial reasoning - Safety checks",
      icon: Brain,
      color: "from-purple-500/20 to-blue-500/20"
   },
   {
      number: "03",
      title: "Fix",
      subtitle: "🔧 Follow interactive step-by-step guidance",
      description: "Audio instructions - Visual cues - Progress tracking",
      icon: Wrench,
      color: "from-emerald-500/20 to-teal-500/20"
   }
]

export function HowItWorks() {
   return (
      <section id="process" className="pt-24 md:pt-32 pb-12 md:pb-24 px-4 md:px-6 relative overflow-hidden">
         {/* Background Elements */}
         {/* <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[75px] pointer-events-none " /> */}

         <div className="container mx-auto max-w-7xl relative ">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
               <div className="space-y-4 max-w-2xl text-left">
                  <motion.div
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold uppercase tracking-widest"
                  >
                     The Process
                  </motion.div>
                  <h2 className="text-4xl md:text-7xl font-bold tracking-tight leading-none">
                     How it <span className="text-accent ">Works</span>
                  </h2>
               </div>

               <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm shadow-2xl shadow-accent/5"
               >
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-sm font-medium text-white/90">
                     From photo to fix in <span className="text-accent font-bold text-lg leading-none">under 2 minutes</span>
                  </span>
               </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {steps.map((step, index) => (
                  <motion.div
                     key={step.title}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: index * 0.2, duration: 0.6 }}
                     viewport={{ once: true }}
                     className="group relative"
                  >
                     <div className="h-full p-8 md:p-10 rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent hover:from-white/[0.08] transition-all duration-700 relative overflow-hidden flex flex-col">
                        {/* Background Glow */}
                        <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${step.color} blur-[120px] transition-opacity duration-700 opacity-20 group-hover:opacity-100`} />

                        <div className="relative z-10">
                           <div className="flex items-center justify-between mb-10">
                              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-white/10">
                                 <step.icon className="w-8 h-8 text-accent" />
                              </div>
                              <span className="text-5xl font-black text-white/5 group-hover:text-accent/20 transition-colors duration-700">
                                 {step.number}
                              </span>
                           </div>

                           <h3 className="text-3xl font-bold mb-2 text-white/95">{step.title}</h3>
                           <p className="text-accent text-[10px] font-bold uppercase tracking-wider mb-6 flex items-center gap-2">
                              {step.subtitle}
                           </p>

                           <div className="space-y-3 mb-12">
                              {step.description.split('-').map((detail, i) => (
                                 <div key={i} className="flex items-center gap-3 text-muted-foreground group-hover:text-white/70 transition-colors">
                                    <CheckCircle2 className="w-4 h-4 text-accent/50 group-hover:text-accent transition-colors" />
                                    <span className="text-sm font-medium">{detail.trim()}</span>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div className="mt-auto relative z-10 pt-8 border-t border-white/5 bg-white/0">
                           <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-accent transition-colors duration-500">
                              <span>Seamless Integration</span>
                              <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500" />
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
   )
}
