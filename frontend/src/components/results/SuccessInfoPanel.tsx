"use client";

import { motion } from "framer-motion";
import { MapPin, Search, BookOpen, Wrench, CheckCircle2, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnswerType, DeviceInfo, LocalizationResult } from "@/types/api-response";

interface SuccessInfoPanelProps {
   answerType: AnswerType;
   deviceInfo?: DeviceInfo;
   localizationResults?: LocalizationResult[];
}

const getInfoContent = (
   answerType: AnswerType,
   deviceInfo?: DeviceInfo,
   localizationResults?: LocalizationResult[]
) => {
   switch (answerType) {
      case "locate_only":
         return {
            icon: <MapPin className="w-5 h-5" />,
            title: "Component Location",
            description: "I've highlighted the requested components in the image",
            content: localizationResults && (
               <ul className="space-y-2 mt-3">
                  {localizationResults.map((result, index) => (
                     <li
                        key={index}
                        className="flex items-center gap-2 text-sm text-white/80"
                     >
                        <span
                           className={`
                    flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs
                    ${result.status === "found"
                                 ? "bg-emerald-500/20 text-emerald-400"
                                 : result.status === "not_visible"
                                    ? "bg-amber-500/20 text-amber-400"
                                    : "bg-red-500/20 text-red-400"
                              }
                  `}
                        >
                           {result.status === "found"
                              ? "✓"
                              : result.status === "not_visible"
                                 ? "⚠"
                                 : "✗"}
                        </span>
                        <span className="font-medium">{result.target}:</span>
                        <span className="text-white/60">
                           {result.status === "found"
                              ? result.spatial_description
                              : result.suggested_action}
                        </span>
                     </li>
                  ))}
               </ul>
            ),
         };

      case "identify_only":
         return {
            icon: <Search className="w-5 h-5" />,
            title: "Device Identified",
            description: "Successfully identified your device",
            content: deviceInfo && (
               <div className="grid grid-cols-2 gap-3 mt-3">
                  <div className="p-3 rounded-lg bg-white/5">
                     <span className="text-xs text-white/50 block mb-1">Type</span>
                     <span className="text-sm font-medium text-white/90">
                        {deviceInfo.device_type}
                     </span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                     <span className="text-xs text-white/50 block mb-1">Brand</span>
                     <span className="text-sm font-medium text-white/90">
                        {deviceInfo.brand || "Unknown"}
                     </span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                     <span className="text-xs text-white/50 block mb-1">Model</span>
                     <span className="text-sm font-medium text-white/90">
                        {deviceInfo.model || "Unknown"}
                     </span>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5">
                     <span className="text-xs text-white/50 block mb-1">Confidence</span>
                     <span
                        className={`text-sm font-medium ${deviceInfo.confidence >= 0.8
                              ? "text-emerald-400"
                              : deviceInfo.confidence >= 0.5
                                 ? "text-amber-400"
                                 : "text-red-400"
                           }`}
                     >
                        {Math.round(deviceInfo.confidence * 100)}%
                     </span>
                  </div>
               </div>
            ),
         };

      case "explain_only":
         return {
            icon: <BookOpen className="w-5 h-5" />,
            title: "Explanation Provided",
            description: "I've explained how this device works below",
            content: null,
         };

      case "troubleshoot_steps":
         return {
            icon: <Wrench className="w-5 h-5" />,
            title: "Troubleshooting Guide Ready",
            description: "Follow the steps below to resolve the issue",
            content: null,
         };

      case "mixed":
         return {
            icon: <CheckCircle2 className="w-5 h-5" />,
            title: "Analysis Complete",
            description: "I've provided identification, diagnosis, and repair steps",
            content: null,
         };

      default:
         return {
            icon: <Info className="w-5 h-5" />,
            title: "Results Ready",
            description: "See the analysis results below",
            content: null,
         };
   }
};

export function SuccessInfoPanel({
   answerType,
   deviceInfo,
   localizationResults,
}: SuccessInfoPanelProps) {
   // Don't show for failure states
   if (
      ["reject_invalid_image", "ask_for_better_input", "safety_warning_only", "ask_clarifying_questions"].includes(
         answerType
      )
   ) {
      return null;
   }

   const info = getInfoContent(answerType, deviceInfo, localizationResults);

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.1 }}
      >
         <Card className="border-blue-500/30 bg-blue-950/20">
            <CardHeader className="pb-2">
               <CardTitle className="flex items-center gap-2 text-blue-300">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                     {info.icon}
                  </div>
                  {info.title}
               </CardTitle>
            </CardHeader>
            <CardContent>
               <p className="text-white/70">{info.description}</p>
               {info.content}
            </CardContent>
         </Card>
      </motion.div>
   );
}
