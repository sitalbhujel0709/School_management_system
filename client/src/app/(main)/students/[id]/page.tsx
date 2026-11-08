"use client";
import AssignClassDropdown from "@/lib/components/classes/AssignClassDropdown";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { assignClassToStudent, getStudentDetailsById } from "@/lib/store/students/studentSlice";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const page = () => {
  const params = useParams();
  const studentId = params.id as string;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getStudentDetailsById(studentId));
  }, [studentId]);

  const selectedStudentDetails = useAppSelector(
    (state) => state.students.selectedStudentDetails,
  );
  const classes = useAppSelector((state) => state.classes.classes);
  const classesData = classes.map((classItem) => ({
    id: classItem.id,
    class_name: classItem.class_name,
  }));

  const handleAssignClass = async (classId: string) => {
    try {
      const response = await dispatch(assignClassToStudent(studentId, classId));
      if (response.success) {
        toast.success("Class assigned successfully");
        dispatch(getStudentDetailsById(studentId));
      }
    } catch (error: any) {
      console.error("Error assigning class to student:", error);
      toast.error("Failed to assign class to student");
    }
  }
  return (
    <div className="py-8 px-6 h-full">
      <div className="bg-gray-white w-full h-full p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="shadow-md p-1 ">
            <div className="space-y-2 mb-8">
              <div className="w-24 h-24 overflow-hidden">
                <Image
                  src={`https://placehold.co/128`}
                  width={128}
                  height={128}
                  alt="image"
                  unoptimized
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-800">
                  {selectedStudentDetails?.student_full_name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {selectedStudentDetails?.student_email}
                </p>
              </div>
            </div>
            <div className="">
              <h3 className="font-bold text-lg text-green-800">
                Student Information
              </h3>

              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-6 py-1">
                  <label className="text-gray-500 text-sm">Full Name:</label>
                  <p className="text-green-800 font-semibold">
                    {selectedStudentDetails?.student_full_name}
                  </p>
                </div>
                <div className="flex items-center gap-6  py-1">
                  <label className="text-gray-500 text-sm">Email:</label>
                  <p className="text-green-800 font-semibold">
                    {selectedStudentDetails?.student_email}
                  </p>
                </div>
                <div className="flex items-center gap-6 py-1">
                  <label className="text-gray-500 text-sm">
                    Date of Birth:
                  </label>
                  <p className="text-green-800 font-semibold">
                    {new Date(selectedStudentDetails?.student_date_of_birth!).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-6  py-1">
                  <label className="text-gray-500 text-sm">Address:</label>
                  <p className="text-green-800 font-semibold">
                    {selectedStudentDetails?.student_address}
                  </p>
                </div>
                <div className="flex items-center gap-6  py-1">
                  <label className="text-gray-500 text-sm">Class</label>
                  {selectedStudentDetails?.class_name === null ? (
                    <AssignClassDropdown classes={classesData} onAssign={(classId) => {
                      handleAssignClass(classId)
                    }} />
                  ) : (
                    <p className="text-green-800 font-semibold">
                      {selectedStudentDetails?.class_name}
                    </p>
                  )}
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
