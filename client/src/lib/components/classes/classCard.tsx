import { IClass } from "@/lib/store/classes/classSlice.type";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const classCard = ({data}: {data: IClass}) => {
  return (
    <div className="max-w-sm w-full bg-white shadow-sm">
      <div className="flex justify-center bg-green-800 text-white py-2.5">
        <h3 className="text-2xl font-semibold uppercase ">{data.class_name}</h3>
      </div>
      <div className="p-2">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500 bg-emerald-50 w-fit px-1 rounded-full">Level {data.class_level}</p>
            <p className="text-xl font-semibold text-green-800">{data.total_students} students</p>
          </div>
          <Link href={`/classes/${data.id}`} className="text-gray-500 flex items-center px-1 hover:border-b hover:border-gray-700 hover:text-gray-600 ">
            <span>view class</span>
            <ArrowUpRight className="ml-1" size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default classCard;
