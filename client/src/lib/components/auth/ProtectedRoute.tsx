import { getServerUser } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import React from "react";

const ProtectedRoute = async ({ children }: { children: React.ReactNode }) => {
  const user = await getServerUser();
  console.log("ProtectedRoute user", user);
  if(!user){
    redirect("/login");
  }
  return <>{children}</>;
};

export default ProtectedRoute;
