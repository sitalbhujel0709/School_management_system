"use client"
import { getCurrentUser } from "@/lib/store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setupTenant } from "@/lib/store/tenant/tenantSlice";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

const NoTenant = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isLoading } = useAppSelector((state) => state.tenant);
  const handleSetupTenant =async () => {
    try {
      const result = await dispatch(setupTenant());
      if(result.success){
        toast.success("Tenant setup successfully");
        await dispatch(getCurrentUser())
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to setup tenant");
    }
  }
  return (
    <div className="h-full flex justify-center items-center">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-green-800">
            Let's get started
          </h1>
          <p className="text-lg font-semibold text-gray-500">
            You don't have any tenants yet. Create one to get started.
          </p>
        </div>
        <div>
          <button disabled={isLoading} className="px-4 py-2.5 text-xl bg-green-800 text-white cursor-pointer hover:bg-green-900" onClick={handleSetupTenant}>
            Setup Tenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoTenant;
