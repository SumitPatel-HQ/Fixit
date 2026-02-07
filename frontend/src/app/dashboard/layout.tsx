"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
   LayoutDashboardIcon,
   UploadIcon,
   FileTextIcon,
   ClockIcon,
   SettingsIcon,
} from "lucide-react";

const navigation = [
   { name: "Input Hub", href: "/dashboard", icon: UploadIcon },
   { name: "Results", href: "/dashboard/results", icon: FileTextIcon },
   { name: "History", href: "/dashboard/history", icon: ClockIcon },
   { name: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
];

export default function DashboardLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   const pathname = usePathname();

   return (
      <div className="min-h-screen bg-background overflow-hidden selection:bg-accent/30">
         {/* Decorative Background Blobs - Visible through the glass sidebar */}
         {/* <div className="fixed -left-20 top-20 w-80 h-80 bg-accent/20 rounded-full blur-[100px] animate" />
         <div className="fixed -left-10 bottom-20 w-60 h-60 bg-blue-600/10 rounded-full blur-[80px] animate-pulse delay-700" /> */}

         {/* Navigation - Floating Sidebar */}
         <aside className="fixed left-4 top-4 bottom-4 w-66 bg-[#0c0c0c]/60 backdrop-blur-2xl border border-white/[0.05] rounded-[2rem] p-6 z-50 flex flex-col shadow-2xl shadow-black/50">
            {/* Logo Section */}
            <div className="mb-10 px-2">
               <Link href="/" className="flex items-center mt-2 gap-3 group">
                  <span className="font-display text-3xl font-bold tracking-tight text-white">
                     Fixit
                  </span>
               </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-2">
               {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                     <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                           "relative flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group font-medium",
                           isActive
                              ? "text-primary bg-primary/10 shadow-lg shadow-primary/5 border border-primary/10"
                              : "text-muted-foreground hover:text-white hover:bg-white/[0.03]"
                        )}
                     >
                        <Icon className={cn(
                           "w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110",
                           isActive ? "text-primary" : "group-hover:text-primary"
                        )} />
                        <span className="relative z-10">{item.name}</span>

                        {isActive && (
                           <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary blur-[1px] shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                        )}
                     </Link>
                  );
               })}
            </nav>

            {/* User Profile Section */}
            <div className="pt-6 border-t border-white/[0.05]">
               <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.05] group hover:bg-white/[0.05] transition-colors cursor-pointer">
                  <div className="relative">
                     <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                        <span className="text-primary font-display font-bold text-sm">U</span>
                     </div>
                     <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#0c0c0c] rounded-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <p className="text-sm font-semibold text-white truncate group-hover:text-primary transition-colors">
                        User
                     </p>
                     <p className="text-[10px] text-muted-foreground truncate uppercase tracking-wider font-bold">
                        Premium Plan
                     </p>
                  </div>
               </div>
            </div>
         </aside>

         {/* Main Content Area */}
         <main className="ml-76 mr-4 pt-10 mt-2 pb-8 relative">
            <div className="max-w-7xl mx-auto">{children}</div>
         </main>
      </div>
   );
}
