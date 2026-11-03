"use client"
import AdminDashboard from '@/lib/components/dashboard/AdminDashboard';
import NoTenant from '@/lib/components/dashboard/NoTenant';
import { useAppSelector } from '@/lib/store/hooks';
import React from 'react'

const page = () => {
  const { user } = useAppSelector((state) => state.auth);


  return (
    <div className="p-4 h-full">
      {
        (!user?.tenant || 
          !user.tenant?.tenantCode) ? (
          <NoTenant/>
        ):(
          <AdminDashboard/>
        )
      }
    </div>
  )
}

export default page