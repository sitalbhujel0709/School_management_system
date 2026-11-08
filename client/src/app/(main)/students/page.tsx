"use client";
import DataCard from "@/lib/components/common/DataCard";
import Table from "@/lib/components/common/Table";
import StudentModal from "@/lib/components/student/studentModal";
import { IStudent } from "@/lib/store/classes/classSlice.type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllStudents } from "@/lib/store/students/studentSlice";
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

  useEffect(() => {
    dispatch(getAllStudents());
  }, [dispatch]);

  const { students, loading, error } = useAppSelector(
    (state) => state.students,
  );
  const tableData = students?.map((student) => ({
    "Full Name": student.student_full_name,
    Email: student.student_email,
    "Date of Birth": new Date(
      student.student_date_of_birth,
    ).toLocaleDateString(),
    Address: student.student_address,
    Class: student.class_name,
    Action: <ActionButton link={`/students/${student.student_id}`} />,
  }));

  const tableButton = (
    <div>
      {isModalOpen && (
        <StudentModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2.5 bg-green-800 text-white hover:bg-green-900 cursor-pointer"
      >
        Create Student
      </button>
    </div>
  );
  return (
    <div className="py-8 px-6">
      <div>
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-green-800">Students</h2>
          <p className="text-gray-500 text-sm">
            List of all students in the school
          </p>
        </div>
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DataCard title="Total Students" value={20} />
          <DataCard title="Active Students" value={15} />
          <DataCard title="Inactive Students" value={5} />
        </div>
        <div>
          <Table
            tableHeadings={[
              "Full Name",
              "Email",
              "Date of Birth",
              "Address",
              "Class",
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
