"use client";
import { logoutUser } from "@/lib/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Sidebar = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const {user} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout =async  () => {
    try {
      const result = await dispatch(logoutUser());
      if(result.success){
        router.replace("/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }
  return (
    <div
      className={` h-full border-r border-gray-300 shadow-sm ${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300 relative`}
    >
      <div className="flex flex-col h-full">
        {/* sidebar header */}
        <div className="flex items-center justify-start h-16 border-b border-gray-300 px-4">
          <Image src={`/letter-s.png`} width={32} height={32} alt="Logo" />
          {isSidebarOpen && (
            <h3 className="text-3xl font-bold text-green-700">kool</h3>
          )}
        </div>
        {/* sidebar Footer */}
        <div>
          <div className="absolute bottom-0 w-full h-16 border-t border-gray-300">
            <div className="flex items-center justify-start gap-2  h-full px-4">
              
              <div className="w-8 h-8 bg-green-800 text-white flex justify-center items-center">{user?.username[0].toUpperCase()}</div>
              <div className={`flex flex-col ${isSidebarOpen ? "ml-2" : "hidden"}`}>
                <p className="text-sm font-medium text-green-800">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.subscription?.plan}</p>
              </div>
              <div onClick={handleLogout} className={`ml-auto cursor-pointer ${isSidebarOpen ? "" : "hidden"}`}>
                <LogOut size={20} className={`text-green-800 `}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
