"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getTeacherById } from "@/lib/store/teachers/teacherSlice";
import { X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const teacherId = id as string;

  useEffect(() => {
    dispatch(getTeacherById(teacherId));
  }, [teacherId]);

  const selectedTeacher = useAppSelector(
    (state) => state.teachers.selectedTeacher,
  );

  return (
    <div className="py-8 px-6">
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
                  {selectedTeacher?.full_name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {selectedTeacher?.email}
                </p>
              </div>
            </div>
            <div className="">
              <h3 className="font-bold text-lg text-green-800">
                Teacher Information
              </h3>

              <div className="mt-2 space-y-1">
                <div className="flex items-center gap-6 py-1">
                  <label className="text-gray-500 text-sm">Full Name:</label>
                  <p className="text-green-800 font-semibold">
                    {selectedTeacher?.full_name}
                  </p>
                </div>
                <div className="flex items-center gap-6  py-1">
                  <label className="text-gray-500 text-sm">Email:</label>
                  <p className="text-green-800 font-semibold">
                    {selectedTeacher?.email}
                  </p>
                </div>
                <div className="flex items-center gap-6 py-1">
                  <label className="text-gray-500 text-sm">
                    Date of Birth:
                  </label>
                  <p className="text-green-800 font-semibold">
                    {new Date(
                      selectedTeacher?.date_of_Birth!,
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-6  py-1">
                  <label className="text-gray-500 text-sm">Address:</label>
                  <p className="text-green-800 font-semibold">
                    {selectedTeacher?.address}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <h3 className="font-bold text-lg text-green-800">
                  Assigned Subjects
                </h3>
                <button className="bg-green-800 text-white px-3 py-1.5 cursor-pointer hover:bg-green-900">Assign Subject</button>
              </div>
              <div className="mt-2 space-y-1">
                {selectedTeacher?.subjects &&
                selectedTeacher.subjects.length > 0 ? (
                  <ul className="">
                    {selectedTeacher?.subjects?.map((subject) => (
                      <li
                        key={subject.subject_code}
                        className="flex items-center justify-between px-2 py-1 hover:bg-green-50"
                      >
                        <div className="">
                          <p className="text-green-800 font-semibold">
                            {subject.subject_name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            {subject.subject_code}
                          </p>
                        </div>
                        <button className="p-1 hover:bg-gray-100 cursor-pointer">
                          <X size={16} />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-green-800 font-semibold">
                    No subjects assigned to this teacher.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
