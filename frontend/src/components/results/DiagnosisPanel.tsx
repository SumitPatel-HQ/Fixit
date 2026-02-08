"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Flame, Info, AlertCircle, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Diagnosis, Severity, CannotComplyReason } from "@/types/api-response";

interface DiagnosisPanelProps {
   diagnosis?: Diagnosis;
   cannotComplyReason?: CannotComplyReason;
   failureMessage?: string;
}

const SEVERITY_CONFIG: Record<
   Severity,
   { bg: string; border: string; text: string; icon: React.ReactNode; label: string }
> = {
   low: {
      bg: "bg-emerald-500/20",
      border: "border-emerald-500/30",
      text: "text-emerald-300",
      icon: <Info className="w-4 h-4" />,
      label: "Low Priority",
   },
   medium: {
      bg: "bg-yellow-500/20",
      border: "border-yellow-500/30",
      text: "text-yellow-300",
      icon: <AlertCircle className="w-4 h-4" />,
      label: "Medium Priority",
   },
   high: {
      bg: "bg-orange-500/20",
      border: "border-orange-500/30",
      text: "text-orange-300",
      icon: <AlertTriangle className="w-4 h-4" />,
      label: "High Priority",
   },
   critical: {
      bg: "bg-red-500/20",
      border: "border-red-500/30",
      text: "text-red-300",
      icon: <Flame className="w-4 h-4" />,
      label: "Critical",
   },
};

const getIndicatorIcon = (text: string) => {
   const lower = text.toLowerCase();
   if (lower.includes("wifi") || lower.includes("disconnect") || lower.includes("signal")) return "📉";
   if (lower.includes("heat") || lower.includes("hot") || lower.includes("temp")) return "🌡️";
   if (lower.includes("sound") || lower.includes("noise") || lower.includes("beep")) return "🔊";
   if (lower.includes("light") || lower.includes("led") || lower.includes("blink")) return "💡";
   if (lower.includes("slow") || lower.includes("lag") || lower.includes("speed")) return "🐢";
   return "🔎";
};

export function DiagnosisPanel({
   diagnosis,
   cannotComplyReason,
   failureMessage,
}: DiagnosisPanelProps) {
   // Show failure panel if there's a failure reason
   if (cannotComplyReason && failureMessage) {
      return (
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
         >
            <Card className="border-red-500/30 bg-red-950/20">
               <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-red-400">
                     <AlertTriangle className="w-5 h-5" />
                     Why This Failed
                  </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
                  <p className="text-red-200/80">{failureMessage}</p>

                  {/* Suggestions based on failure reason */}
                  <div className="space-y-2">
                     <h4 className="text-sm font-medium text-white/70">Suggestions:</h4>
                     <ul className="space-y-1.5">
                        {cannotComplyReason === "invalid_image" && (
                           <>
                              <li className="flex items-start gap-2 text-sm text-white/60">
                                 <span className="text-blue-400">•</span>
                                 Take a photo of an electronic device
                              </li>
                              <li className="flex items-start gap-2 text-sm text-white/60">
                                 <span className="text-blue-400">•</span>
                                 Ensure the device is clearly visible
                              </li>
                           </>
                        )}
                        {cannotComplyReason === "low_confidence" && (
                           <>
                              <li className="flex items-start gap-2 text-sm text-white/60">
                                 <span className="text-blue-400">•</span>
                                 Use better lighting
                              </li>
                              <li className="flex items-start gap-2 text-sm text-white/60">
                                 <span className="text-blue-400">•</span>
                                 Include brand names or labels in frame
                              </li>
                              <li className="flex items-start gap-2 text-sm text-white/60">
                                 <span className="text-blue-400">•</span>
                                 Try a different angle
                              </li>
                           </>
                        )}
                        {cannotComplyReason === "not_visible" && (
                           <>
                              <li className="flex items-start gap-2 text-sm text-white/60">
                                 <span className="text-blue-400">•</span>
                                 Try photographing from a different angle
                              </li>
                              <li className="flex items-start gap-2 text-sm text-white/60">
                                 <span className="text-blue-400">•</span>
                                 Include the requested component in frame
                              </li>
                           </>
                        )}
                        {cannotComplyReason === "safety_risk" && (
                           <>
                              <li className="flex items-start gap-2 text-sm text-white/60">
                                 <span className="text-red-400">•</span>
                                 Contact a professional technician
                              </li>
                              <li className="flex items-start gap-2 text-sm text-white/60">
                                 <span className="text-red-400">•</span>
                                 Do not attempt DIY repair
                              </li>
                           </>
                        )}
                     </ul>
                  </div>
               </CardContent>
            </Card>
         </motion.div>
      );
   }

   // Don't render if no diagnosis
   if (!diagnosis) return null;

   const severityConfig = SEVERITY_CONFIG[diagnosis.severity];

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.2 }}
         className="space-y-4"
      >
         <Card className={`${severityConfig.border} bg-secondary/50`}>
            <CardHeader className="pb-3">
               <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-white/90">
                     <span className="text-xl">🩺</span>
                     Diagnosis
                  </CardTitle>
                  <div
                     className={`
                inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border
                ${severityConfig.bg} ${severityConfig.text} ${severityConfig.border}
              `}
                  >
                     {severityConfig.icon}
                     {severityConfig.label}
                  </div>
               </div>
            </CardHeader>
            <CardContent className="space-y-5">
               {/* Main Issue */}
               <div>
                  <p className="text-white/90 leading-relaxed">{diagnosis.issue}</p>
               </div>

               {/* Safety Warning */}
               {diagnosis.safety_warning && (
                  <motion.div
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="p-4 rounded-lg bg-red-950/40 border border-red-500/40"
                  >
                     <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                           <Flame className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                           <h4 className="font-semibold text-red-400 flex items-center gap-2">
                              <Shield className="w-4 h-4" />
                              SAFETY WARNING
                           </h4>
                           <p className="text-red-200/80 mt-1">{diagnosis.safety_warning}</p>
                           {diagnosis.severity === "critical" && (
                              <p className="text-red-400 font-medium mt-2 text-sm">
                                 ⚠️ Do NOT attempt DIY repair
                              </p>
                           )}
                        </div>
                     </div>
                  </motion.div>
               )}

               {/* Possible Causes */}
               {diagnosis.possible_causes && diagnosis.possible_causes.length > 0 && (
                  <div>
                     <h4 className="text-sm font-medium text-white/70 mb-2">
                        Possible Causes
                     </h4>
                     <ul className="space-y-2">
                        {diagnosis.possible_causes.map((cause, index) => (
                           <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * index }}
                              className="flex items-start gap-2 text-white/80"
                           >
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                              {cause}
                           </motion.li>
                        ))}
                     </ul>
                  </div>
               )}

               {/* Indicators */}
               {diagnosis.indicators && diagnosis.indicators.length > 0 && (
                  <div>
                     <h4 className="text-sm font-medium text-white/70 mb-2">
                        What You Might See
                     </h4>
                     <div className="flex flex-wrap gap-2">
                        {diagnosis.indicators.map((indicator, index) => (
                           <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.05 * index }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 hover:bg-white/10 transition-colors"
                           >
                              <span>{getIndicatorIcon(indicator)}</span>
                              {indicator}
                           </motion.span>
                        ))}
                     </div>
                  </div>
               )}
            </CardContent>
         </Card>
      </motion.div>
   );
}
