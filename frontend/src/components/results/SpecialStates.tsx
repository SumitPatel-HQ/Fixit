"use client";

import { motion } from "framer-motion";
import {
   Flame,
   Shield,
   Phone,
   AlertTriangle,
   ExternalLink,
   XCircle,
   Camera,
   Upload,
   Lightbulb,
   ImageOff,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CannotComplyReason } from "@/types/api-response";

interface SafetyWarningOnlyProps {
   safetyMessage: string;
   onContactProfessional?: () => void;
}

export function SafetyWarningOnly({
   safetyMessage,
   onContactProfessional,
}: SafetyWarningOnlyProps) {
   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="flex items-center justify-center min-h-[400px]"
      >
         <Card className="max-w-lg w-full border-red-500/50 bg-red-950/30 overflow-hidden">
            {/* Header Bar */}
            <div className="bg-red-500/20 px-6 py-3 flex items-center gap-3 border-b border-red-500/30">
               <Flame className="w-5 h-5 text-red-400 animate-pulse" />
               <span className="font-bold text-red-300 uppercase tracking-wide text-sm">
                  Critical Safety Warning
               </span>
            </div>

            <CardContent className="p-6 space-y-6">
               {/* Main Warning */}
               <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                     <Shield className="w-7 h-7 text-red-400" />
                  </div>
                  <div>
                     <h2 className="text-xl font-bold text-red-300 mb-2">
                        Do NOT Attempt DIY Repair
                     </h2>
                     <p className="text-red-200/80 leading-relaxed">{safetyMessage}</p>
                  </div>
               </div>

               {/* Warning Icon Banner */}
               <div className="flex items-center justify-center gap-2 py-4">
                  {[1, 2, 3].map((i) => (
                     <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                     >
                        <AlertTriangle className="w-8 h-8 text-red-500/50" />
                     </motion.div>
                  ))}
               </div>

               {/* Professional Help Options */}
               <div className="space-y-3">
                  <h4 className="text-sm font-medium text-white/70">
                     Get Professional Help:
                  </h4>
                  <div className="space-y-2">
                     <Button
                        variant="secondary"
                        className="w-full justify-start gap-3 bg-white/5 hover:bg-white/10"
                        onClick={onContactProfessional}
                     >
                        <Phone className="w-4 h-4" />
                        Contact a Qualified Technician
                     </Button>
                     <Button
                        variant="secondary"
                        className="w-full justify-start gap-3 bg-white/5 hover:bg-white/10"
                     >
                        <ExternalLink className="w-4 h-4" />
                        Find Manufacturer Support
                     </Button>
                  </div>
               </div>

               {/* Emergency Note */}
               <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3">
                  <Flame className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-200/80">
                     <strong>In case of smoke, fire, or immediate danger:</strong>{" "}
                     Disconnect power immediately and contact emergency services if
                     necessary.
                  </p>
               </div>
            </CardContent>
         </Card>
      </motion.div>
   );
}

interface InvalidImagePanelProps {
   reason: CannotComplyReason;
   explanation?: string;
   onRetry: () => void;
   onUploadNew: () => void;
}

export function InvalidImagePanel({
   reason,
   explanation,
   onRetry,
   onUploadNew,
}: InvalidImagePanelProps) {
   const isInvalidImage = reason === "invalid_image";

   const supportedDevices = [
      "Laptops & Motherboards",
      "Routers & Modems",
      "Smartphones",
      "Desktop PCs",
      "Televisions",
      "Gaming Consoles",
      "Printers",
      "Smart Home Devices",
   ];

   return (
      <motion.div
         initial={{ opacity: 0, scale: 0.95 }}
         animate={{ opacity: 1, scale: 1 }}
         className="flex items-center justify-center min-h-[400px]"
      >
         <Card className="max-w-lg w-full border-amber-500/30 bg-amber-950/10">
            <CardHeader className="text-center pb-4">
               <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-4">
                  {isInvalidImage ? (
                     <ImageOff className="w-8 h-8 text-amber-400" />
                  ) : (
                     <XCircle className="w-8 h-8 text-amber-400" />
                  )}
               </div>
               <CardTitle className="text-xl text-white">
                  {isInvalidImage
                     ? "Not a Supported Device"
                     : "Better Image Needed"}
               </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               {/* Explanation */}
               {explanation && (
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                     <h4 className="text-sm font-medium text-white/70 mb-2">
                        What I see:
                     </h4>
                     <p className="text-white/80">{explanation}</p>
                  </div>
               )}

               {/* Suggestions */}
               {reason === "low_confidence" && (
                  <div className="space-y-3">
                     <h4 className="text-sm font-medium text-white/70 flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        Tips for a Better Photo:
                     </h4>
                     <ul className="space-y-2">
                        {[
                           "Ensure the entire device is visible",
                           "Use good, even lighting",
                           "Include any visible brand names or labels",
                           "Keep the camera steady to avoid blur",
                           "Try a different angle",
                        ].map((tip, i) => (
                           <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-white/60"
                           >
                              <span className="text-accent">•</span>
                              {tip}
                           </li>
                        ))}
                     </ul>
                  </div>
               )}

               {/* Supported Devices */}
               {isInvalidImage && (
                  <div>
                     <h4 className="text-sm font-medium text-white/70 mb-3">
                        Supported Devices:
                     </h4>
                     <div className="grid grid-cols-2 gap-2">
                        {supportedDevices.map((device, i) => (
                           <motion.div
                              key={device}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.03 }}
                              className="flex items-center gap-2 text-sm text-white/60 p-2 rounded-lg bg-white/5"
                           >
                              <span className="text-emerald-400">✓</span>
                              {device}
                           </motion.div>
                        ))}
                     </div>
                  </div>
               )}

               {/* Actions */}
               <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                     variant="secondary"
                     className="flex-1 gap-2"
                     onClick={onRetry}
                  >
                     <Camera className="w-4 h-4" />
                     Retake Photo
                  </Button>
                  <Button
                     variant="default"
                     className="flex-1 gap-2"
                     onClick={onUploadNew}
                  >
                     <Upload className="w-4 h-4" />
                     Upload Different Image
                  </Button>
               </div>
            </CardContent>
         </Card>
      </motion.div>
   );
}
