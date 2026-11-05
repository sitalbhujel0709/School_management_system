import DataCard from "@/lib/components/common/DataCard";
import Table from "@/lib/components/common/Table";
import { Presentation } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="py-8 px-6">
      <div>
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <Presentation size={16} className="mr-2" />
            <p>Class</p>
          </div>
          <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-green-800">Lotus</h2>
          <p className="text-2xl font-bold text-gray-500 border border-gray-300 px-2">Level 2</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mt-8">
          <DataCard title="Total Students" value={20}/>
          <DataCard title="Total Teachers" value={5}/>
          <DataCard title="seats Available" value={10}/>
        </div>
        <div className="mt-8">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default page;
