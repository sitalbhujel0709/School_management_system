"use client";
import ClassCard from "@/lib/components/classes/classCard";
import ClassModal from "@/lib/components/classes/classModal";
import { getAllClasses } from "@/lib/store/classes/classSlice";
import { IClass } from "@/lib/store/classes/classSlice.type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React, { useEffect, useState } from "react";

const page = () => {

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllClasses());
  }, [dispatch]);
  const classes = useAppSelector((state) => state.classes.classes);
  return (
    <div className="py-8 px-6 relative">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-green-800">My Classes</h1>
          <p className="text-gray-500 text-sm">
            Classes in your tenant, create and manage your classes here
          </p>
        </div>
        <div>
          <button onClick={() => setIsCreateModalOpen(true)} className="px-4 py-2.5 bg-green-800 text-white hover:bg-green-900 cursor-pointer">
            Add Class
          </button>
          {
            isCreateModalOpen && (
              <ClassModal isModalOpen={isCreateModalOpen} setIsModalOpen={setIsCreateModalOpen} />
            )
          }
        </div>
      </div>
      <div className="p-2 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
          {classes.length > 0 &&
            classes.map((classData: IClass) => (
              <ClassCard key={classData.id} data={classData} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default page;
