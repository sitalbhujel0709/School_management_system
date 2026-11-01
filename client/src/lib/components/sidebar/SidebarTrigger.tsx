"use client";
import { ChevronLeft } from "lucide-react";
import React from "react";

const SidebarTrigger = ({
  isSidebarOpen,
  handleSidebarToggle,
}: {
  isSidebarOpen: boolean;
  handleSidebarToggle: () => void;
}) => {
  return (
    <button
      onClick={handleSidebarToggle}
      className="absolute top-6 -right-3 z-50 p-1 rounded-full bg-green-700 text-white hover:bg-green-800 focus:outline-none cursor-pointer"
    >
      <ChevronLeft
        className={`w-4 h-4 transition-transform duration-300 ${
          isSidebarOpen ? "" : "rotate-180"
        }`}
      />
    </button>
  );
};

export default SidebarTrigger;
