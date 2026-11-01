"use client";
import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import SidebarTrigger from "./SidebarTrigger";
import { useAppDispatch } from "@/lib/store/hooks";
import { getCurrentUser } from "@/lib/store/auth/authSlice";
import Navbar from "../Navbar/Navbar";

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  
  return (
    <div className="flex w-full h-screen relative">
      <aside className={` ${isSidebarOpen ? 'w-64' : 'w-16'} shrink-0 transition-all duration-300 relative`}>
        <SidebarTrigger isSidebarOpen={isSidebarOpen} handleSidebarToggle={handleSidebar} />
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </aside>
      <div className="flex-1 flex flex-col ">
        <Navbar/>
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarProvider;
