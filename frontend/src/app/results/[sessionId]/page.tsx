'use client';

import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ResultsPage() {
   const params = useParams();
   const sessionId = params.sessionId as string;

   return (
      <div className="max-w-4xl mx-auto space-y-8">
         {/* Page Header */}
         <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold text-foreground">
               Analysis Results
            </h1>
            <p className="text-muted-foreground text-lg">
               Session ID: {sessionId}
            </p>
         </div>

         {/* Results Content - Placeholder */}
         <div className="bg-secondary/50 backdrop-blur-sm border border-border rounded-2xl p-12 min-h-[600px] flex items-center justify-center">
            <div className="text-center space-y-6 max-w-md">
               {/* Success Icon */}
               <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                  <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
               </div>

               <div className="space-y-2">
                  <h3 className="text-2xl font-display font-semibold text-foreground">
                     Analysis Complete!
                  </h3>
                  <p className="text-muted-foreground">
                     Your device has been analyzed. This is a placeholder page. The actual results will be displayed here once the backend API is integrated.
                  </p>
               </div>

               {/* Action Buttons */}
               <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link href="/dashboard" className="flex-1">
                     <Button variant="outline" className="w-full">
                        New Analysis
                     </Button>
                  </Link>
                  <Button className="flex-1">
                     View Details
                  </Button>
               </div>

               {/* Session Info */}
               <div className="pt-6 border-t border-border">
                  <div className="space-y-2 text-sm">
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className="text-green-500 font-medium">Completed</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Session ID:</span>
                        <span className="text-foreground font-mono text-xs">{sessionId}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Timestamp:</span>
                        <span className="text-foreground">{new Date().toLocaleString()}</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
