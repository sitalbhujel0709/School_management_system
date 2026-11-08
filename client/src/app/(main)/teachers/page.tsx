"use client";
import DataCard from "@/lib/components/common/DataCard";
import Table from "@/lib/components/common/Table";
import TeacherModal from "@/lib/components/teacher/TeacherModal";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllTeachers } from "@/lib/store/teachers/teacherSlice";
import { Pen } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

const ActionButton = ({ link }: { link: string }) => {
  return <Link href={link} className="px-1 inline-flex cursor-pointer">
    <Pen size={16} className="text-green-600" />
  </Link>;
};

const page = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(()=>{
    dispatch(getAllTeachers());
  },[dispatch]);

  const {teachers,loading,error} = useAppSelector((state)=> state.teachers);

  const tableData = teachers?.map((teacher)=>({
    "Full Name": teacher.full_name,
    "Email": teacher.email,
    "Date of Birth": new Date(teacher.date_of_Birth).toLocaleDateString(),
    "Address": teacher.address,
    "subjects": teacher.subjects?.map((subject)=> subject.subject_name).join(", "),
    "Action": <ActionButton link={`/teachers/${teacher.id}`} />
  }))

  const tableButton = (
    <div>
      {isModalOpen && (
        <TeacherModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2.5 bg-green-800 text-white hover:bg-green-900 cursor-pointer"
      >
        Create Teacher
      </button>
    </div>
  );
  return (
    <div className="py-8 px-6">
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-green-800">Teachers</h2>
          <p className="text-gray-500 text-sm">
            List of all teachers in the school
          </p>
        </div>
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DataCard title="Total Teachers" value={10} />
          <DataCard title="Active Teachers" value={8} />
          <DataCard title="Inactive Teachers" value={2} />
        </div>
         <div>
          <Table
            tableHeadings={[
              "Full Name",
              "Email",
              "Date of Birth",
              "Address",
              "Subjects",
              "Action",
            ]}
            tableData={tableData}
            tableTitle="All Students"
            tableDescription="List of all students in the school"
            tableButton={tableButton}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
