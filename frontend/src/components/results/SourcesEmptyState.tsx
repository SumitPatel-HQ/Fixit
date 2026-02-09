import React from "react";
import { motion } from "framer-motion";

type EmptyStateType = "no_sources" | "failed" | "loading";

interface SourcesEmptyStateProps {
   type: EmptyStateType;
   deviceBrand?: string;
   deviceModel?: string;
   onRetry?: () => void;
}

// Manufacturer support URLs
const MANUFACTURER_URLS: Record<string, { support: string; docs: string }> = {
   hp: {
      support: "https://support.hp.com",
      docs: "https://support.hp.com/document",
   },
   dell: {
      support: "https://www.dell.com/support",
      docs: "https://www.dell.com/support/manuals",
   },
   apple: {
      support: "https://support.apple.com",
      docs: "https://support.apple.com/manuals",
   },
   samsung: {
      support: "https://www.samsung.com/support",
      docs: "https://www.samsung.com/support/manuals",
   },
   sony: {
      support: "https://www.sony.com/support",
      docs: "https://www.sony.com/support/manuals",
   },
   "tp-link": {
      support: "https://www.tp-link.com/support",
      docs: "https://www.tp-link.com/support/download",
   },
   netgear: {
      support: "https://www.netgear.com/support",
      docs: "https://www.netgear.com/support/product",
   },
   asus: {
      support: "https://www.asus.com/support",
      docs: "https://www.asus.com/support/Download-Center",
   },
   canon: {
      support: "https://www.usa.canon.com/support",
      docs: "https://www.usa.canon.com/support/products",
   },
   epson: {
      support: "https://epson.com/support",
      docs: "https://epson.com/Support/Printers",
   },
   brother: {
      support: "https://support.brother.com",
      docs: "https://support.brother.com/g/b/manuallist.aspx",
   },
   lg: {
      support: "https://www.lg.com/support",
      docs: "https://www.lg.com/support/manuals-documents",
   },
   microsoft: {
      support: "https://support.microsoft.com",
      docs: "https://support.microsoft.com/products",
   },
   lenovo: {
      support: "https://support.lenovo.com",
      docs: "https://support.lenovo.com/documentation",
   },
};

export function SourcesEmptyState({
   type,
   deviceBrand,
   deviceModel,
   onRetry,
}: SourcesEmptyStateProps) {
   // Get manufacturer-specific URLs
   const brandKey = deviceBrand?.toLowerCase().replace(/\s+/g, "-") || "";
   const manufacturerUrls = MANUFACTURER_URLS[brandKey];

   const getContent = () => {
      switch (type) {
         case "loading":
            return {
               icon: (
                  <div className="animate-spin">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                     </svg>
                  </div>
               ),
               title: "Loading Sources...",
               description: "Retrieving reference materials and documentation for your device.",
               showLinks: false,
               showRetry: false,
            };

         case "failed":
            return {
               icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
               ),
               title: "Sources Temporarily Unavailable",
               description: "We attempted to retrieve sources but the search service is unavailable. The repair steps are based on general knowledge.",
               showLinks: true,
               showRetry: true,
            };

         case "no_sources":
         default:
            return {
               icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
               ),
               title: "Sources Currently Unavailable",
               description: "We couldn't retrieve external sources at this time. The repair steps use general knowledge for this device type.",
               showLinks: true,
               showRetry: false,
            };
      }
   };

   const content = getContent();

   return (
      <motion.div
         initial={{ opacity: 0, y: 10 }}
         animate={{ opacity: 1, y: 0 }}
         className="flex flex-col items-center justify-center py-16 text-center space-y-4 bg-secondary/10 rounded-xl border border-white/5"
      >
         {/* Icon */}
         <div className="w-12 h-12 rounded-full bg-secondary/30 flex items-center justify-center text-muted-foreground">
            {content.icon}
         </div>

         {/* Text Content */}
         <div className="space-y-1">
            <h3 className="text-lg font-medium text-white">{content.title}</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
               {content.description}
            </p>
         </div>

         {/* Links Section */}
         {content.showLinks && (
            <div className="pt-4 flex flex-col items-center gap-3 text-sm">
               <span className="text-accent">
                  {deviceBrand
                     ? `For your ${deviceBrand}${deviceModel ? ` ${deviceModel}` : ""}, please consult:`
                     : "For your device, please consult:"}
               </span>
               <div className="flex flex-wrap justify-center gap-4">
                  <a
                     href={manufacturerUrls?.docs || "https://www.google.com/search?q=device+manual"}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/30 text-neutral-300 hover:text-white transition-all group"
                  >
                     <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                     </svg>
                     <span>Manufacturer Documentation</span>
                     <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                     </svg>
                  </a>
                  <a
                     href={manufacturerUrls?.support || "https://www.google.com/search?q=device+support"}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/30 text-neutral-300 hover:text-white transition-all group"
                  >
                     <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                     </svg>
                     <span>Device Support Page</span>
                     <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                     </svg>
                  </a>
               </div>
            </div>
         )}

         {/* Retry Button */}
         {content.showRetry && onRetry && (
            <div className="pt-2">
               <button
                  onClick={onRetry}
                  className="px-4 py-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent font-medium transition-colors flex items-center gap-2"
               >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retry Loading Sources
               </button>
            </div>
         )}
      </motion.div>
   );
}

// Loading skeleton for sources
export function SourcesLoadingSkeleton() {
   return (
      <div className="space-y-4">
         {[1, 2, 3].map((i) => (
            <div
               key={i}
               className="p-5 rounded-xl bg-card border border-border/50 animate-pulse"
            >
               <div className="flex items-start justify-between gap-4">
                  <div className="space-y-3 flex-1">
                     <div className="flex items-center gap-2">
                        <div className="h-5 w-16 bg-white/10 rounded-md" />
                        <div className="h-5 w-24 bg-white/10 rounded-md" />
                     </div>
                     <div className="h-6 w-3/4 bg-white/10 rounded" />
                     <div className="h-4 w-1/3 bg-white/5 rounded" />
                  </div>
                  <div className="flex gap-2">
                     <div className="w-8 h-8 bg-white/10 rounded-lg" />
                     <div className="w-8 h-8 bg-white/10 rounded-lg" />
                  </div>
               </div>
               <div className="mt-4 p-3 bg-secondary/20 rounded-lg">
                  <div className="h-4 w-full bg-white/5 rounded mb-2" />
                  <div className="h-4 w-2/3 bg-white/5 rounded" />
               </div>
            </div>
         ))}
      </div>
   );
}
