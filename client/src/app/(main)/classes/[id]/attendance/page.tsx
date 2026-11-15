"use client";

import {
    createAttendance,
  getAttendanceRecords,
  getAttendanceSession,
} from "@/lib/store/attendance/attendanceSlice";
import { getClassById } from "@/lib/store/classes/classSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface AttendanceData {
  date: string;
  students: {
    studentId: string;
    status: string;
  }[];
}

const page = () => {
  const params = useParams();
  const router = useRouter();
  const classId = params.id as string;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAttendanceRecords(classId));
    dispatch(getClassById(classId));
  }, [classId]);

  
  
  const [attendanceData, setAttendanceData] = useState<AttendanceData>({
    date: new Date().toISOString().split("T")[0],
    students: [],
  });

  let initialAttendanceData: AttendanceData = {
    date: new Date().toISOString().split("T")[0],
    students: [],
  };

  useEffect(()=>{
    dispatch(getAttendanceSession(classId));
  },[])

  const attendance = useAppSelector((state) => state.attendance);
  const students = useAppSelector(
    (state) => state.classes.selectedClassDetails?.students,
  );

  
  useEffect(() => {
    if (!attendance.isAttendanceTaken) {
      students?.forEach((student) => {
        initialAttendanceData.students.push({
          studentId: student.student_id,
          status: "absent",
        });
      });
      setAttendanceData(initialAttendanceData);
    }
  }, [attendance.isAttendanceTaken,students]);

  

  const handleAttendanceChange = (studentId: string, status: string) => {
    setAttendanceData((prevData) => ({
      ...prevData,
      students: prevData.students.map((student) =>
        student.studentId === studentId ? { ...student, status } : student,
      ),
    }));
  };
  console.log(attendance);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmitAttendance = async ()=>{
    try {
      setIsSubmitting(true);
      const response = await dispatch(createAttendance(classId, attendanceData));
      if (response.success) {
        toast.success("Attendance submitted successfully");
        router.refresh();
      }
    } catch (error:any) {
      console.error("Error submitting attendance:", error);
      toast.error(error.message || "An error occurred while submitting attendance");
    } finally {
      setIsSubmitting(false);
    }
  }

  

  return (
    <div className="py-8 px-6">
      <div>
        <div>
          <h3 className="text-2xl text-green-800 font-bold">Attendance</h3>
          <p className="text-gray-500 text-sm">
            Manage student attendance for this class
          </p>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-gray-300">Rose</h3>
              <h3 className="text-lg font-bold text-green-800">
                Attendance Records
              </h3>
            </div>
            <div>
              {
                attendance.isAttendanceTaken ? (
                  <button className="px-4 py-2.5 text-white bg-green-800 cursor-pointer">
                    viewing Attendance
                  </button>

                ):(
                 <div className="flex gap-3">
                

                <button
                  type="button"
                  onClick={handleSubmitAttendance}
                  disabled={isSubmitting}
                  className=" bg-green-700 px-5 py-2.5 text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit Attendance"}
                </button>
              </div>
            )}
               
            </div>
          </div>
          <div>
            <table className="w-full min-w-187.5 text-left text-green-800">
              <thead className="border-b border-gray-300">
                <tr>
                  <th scope="col" className="p-4">
                    Student Name
                  </th>
                  <th scope="col" className="p-4">
                    Student Email
                  </th>
                  <th scope="col" className="p-4">
                    Attendance
                  </th>
                </tr>
              </thead>
              <tbody>
                {attendance.isAttendanceTaken
                  ? attendance.attendanceRecords.map((record) => (
                      <tr className="border-b border-gray-200 transition hover:bg-gray-50">
                        <td className="p-4 font-medium">
                          {record.student_name}
                        </td>
                        <td className="p-4">{record.student_email}</td>
                        <td className="p-4">{record.status}</td>
                      </tr>
                    ))
                  : students?.map((student) => {
                      return (
                        <tr className="border-b border-gray-200 transition hover:bg-gray-50">
                          <td className="p-4 font-medium">
                            {student.student_full_name}
                          </td>
                          <td className="p-4">{student.student_email}</td>
                          <td className="p-4">
                            <div className="flex flex-wrap gap-3">
                              {(
                                [
                                  "present",
                                  "absent",
                                  "late",
                                  "excused",
                                ] as const
                              ).map((status) => (
                                <label
                                  key={status}
                                  className="flex cursor-pointer items-center gap-1.5 text-sm"
                                >
                                  <input
                                    type="radio"
                                    name={`student-${student.student_id}`}
                                    value={status}
                                    checked={
                                      attendanceData.students.find(
                                        (s) =>
                                          s.studentId === student.student_id,
                                      )?.status === status
                                    }
                                    onChange={() =>
                                      handleAttendanceChange(
                                        student.student_id,
                                        status,
                                      )
                                    }
                                    className="accent-green-700"
                                  />

                                  {status}
                                </label>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
