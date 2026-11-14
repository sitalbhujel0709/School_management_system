"use client"
import DataCard from "@/lib/components/common/DataCard";
import Table from "@/lib/components/common/Table";
import { getClassById } from "@/lib/store/classes/classSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { Presentation } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAttendanceSession } from "@/lib/store/attendance/attendanceSlice";

const page = () => {
  const params = useParams()
  const classId = params.id as string;
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(getClassById(classId))
    dispatch(getAttendanceSession(classId))
  },[classId, dispatch])

  const attendanceSession = useAppSelector((state) => state.attendance.attendanceSession);
  console.log("Attendance Session from Redux Store:", attendanceSession);

  const classDetails = useAppSelector((state) => state.classes.selectedClassDetails);
  const tableHeadings = ["Full Name", "Email", "Address", "Action"];
  const tableData = classDetails?.students?.map((student) => ({
    fullName: student.student_full_name,
    email: student.student_email,
    address: student.student_address,

  }))

  return (
    <div className="py-8 px-6">
      <div>
        <Link href="/classes" className="cursor-pointer inline-flex items-center gap-2 text-green-800 mb-4 hover:bg-green-50">
          <ArrowLeft size={20} className="text-green-800" />
        </Link>
        <div>
          <div className="flex items-center text-sm text-gray-500">
            <Presentation size={16} className="mr-2" />
            <p>Class</p>
          </div>
          <div className="flex items-center gap-2">
          <h2 className="text-2xl font-bold text-green-800">{classDetails?.class_name}</h2>
          <p className="text-2xl font-bold text-gray-500 px-2">Level {classDetails?.class_level}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 mt-8">
          <DataCard title="Total Students" value={classDetails?.total_students || 0}/>
          <DataCard title="Total Teachers" value={5}/>
          <DataCard title="seats Available" value={classDetails?.seats_available || 0}/>
        </div>
        <div className="mt-8">
          <Table tableHeadings={tableHeadings} tableData = {tableData || []} tableTitle="Class Students" tableDescription="List of all students in the class" />
        </div>
      </div>
    </div>
  );
};

export default page;
