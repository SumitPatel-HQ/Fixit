"use client";

import React, { createContext, useContext, useState } from "react";

interface DashboardContextType {
   isMobileMenuOpen: boolean;
   setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

   return (
      <DashboardContext.Provider value={{ isMobileMenuOpen, setIsMobileMenuOpen }}>
         {children}
      </DashboardContext.Provider>
   );
}

export function useDashboard() {
   const context = useContext(DashboardContext);
   if (context === undefined) {
      throw new Error("useDashboard must be used within a DashboardProvider");
   }
   return context;
}
