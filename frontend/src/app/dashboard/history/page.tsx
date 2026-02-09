export default function HistoryPage() {
   return (
      <div className="space-y-6">
         {/* Page Header */}
         <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold text-foreground">
               History
            </h1>
            <p className="text-muted-foreground text-lg">
               Review past diagnostics and repair history
            </p>
         </div>

         {/* Main Content Area - Placeholder */}
         <div className="bg-secondary/50 backdrop-blur-sm border border-border rounded-2xl p-12 min-h-[600px] flex items-center justify-center">
            <div className="text-center space-y-4">
               <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto">
                  <svg
                     className="w-8 h-8 text-accent"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                     />
                  </svg>
               </div>
               <h3 className="text-xl font-display font-semibold text-foreground">
                  History Content
               </h3>
               <p className="text-muted-foreground max-w-md">
                  Coming soon...
               </p>
            </div>
         </div>
      </div>
   );
}
