import ProtectedRoute from "@/lib/components/auth/ProtectedRoute";
import SidebarProvider from "@/lib/components/sidebar/SidebarProvider";
import React, { Suspense } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
        </div>
      }
    >
      <ProtectedRoute>
        <div className="w-full">
          <SidebarProvider>{children}</SidebarProvider>
        </div>
      </ProtectedRoute>
    </Suspense>
  );
};

export default layout;
