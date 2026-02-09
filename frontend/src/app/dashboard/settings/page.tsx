export default function SettingsPage() {
   return (
      <div className="space-y-6">
         {/* Page Header */}
         <div className="space-y-2">
            <h1 className="text-4xl font-display font-bold text-foreground">
               Settings
            </h1>
            <p className="text-muted-foreground text-lg">
               Manage your account and preferences
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
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                     />
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                     />
                  </svg>
               </div>
               <h3 className="text-xl font-display font-semibold text-foreground">
                  Settings Content
               </h3>
               <p className="text-muted-foreground max-w-md">
                  Coming soon...
               </p>
            </div>
         </div>
      </div>
   );
}
