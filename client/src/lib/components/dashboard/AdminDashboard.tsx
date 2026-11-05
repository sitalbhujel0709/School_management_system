"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getTenantByOwner } from "@/lib/store/tenant/tenantSlice";
import React from "react";

const AdminDashboard = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getTenantByOwner());
  }, [dispatch]);
  const tenant = useAppSelector((state) => state.tenant.tenant);
  return (
    <div className="h-full p-2">
      <div>
        <h2 className="text-xl font-bold mb-4 text-green-800">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 border border-gray-300 shadow-sm">
            <div className="">
              <h3 className="text-gray-500 text-sm uppercase">
                Total Students
              </h3>
              <p className="mt-1 text-green-800 text-2xl font-bold">
                {tenant?.tenantDetails?.students}
              </p>
            </div>
          </div>
          <div className="p-4 border border-gray-300 shadow-sm">
            <div>
              <h3 className="text-gray-500 text-sm uppercase">
                Total Teachers
              </h3>
              <p className="mt-1 text-green-800 text-2xl font-bold">
                {tenant?.tenantDetails?.teacher_profiles}
              </p>
            </div>
          </div>
          <div className="p-4 shadow-sm border border-gray-300">
            <div>
              <h3 className="text-gray-500 text-sm uppercase">Total Classes</h3>
              <p className="mt-1 text-green-800 text-2xl font-bold">
                {tenant?.tenantDetails?.classes}
              </p>
            </div>
          </div>
          <div className="p-4 shadow-sm border border-gray-300">
            <div>
              <h3 className="text-gray-500 text-sm uppercase">
                Total Subjects
              </h3>
              <p className="mt-1 text-green-800 text-2xl font-bold">
                {tenant?.tenantDetails?.subjects}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
