"use client";
import AssignSubjectModal from "@/lib/components/teacher/AssignSubjectModal";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { assignSubjectsToTeacher, getTeacherById, removeSubjectFromTeacher } from "@/lib/store/teachers/teacherSlice";
import { X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const page = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id } = useParams();
  const teacherId = id as string;

  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getTeacherById(teacherId));
  }, [teacherId]);

  const selectedTeacher = useAppSelector(
    (state) => state.teachers.selectedTeacher,
  );

  useEffect(() => {
    if (selectedTeacher?.subjects) {
      setSelectedSubjects(
        selectedTeacher.subjects.map((subject) => subject.subject_id),
      );
    }
  }, [selectedTeacher]);

  const handleSubjectToggle = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId],
    );
  };

  const handleSaveSubjects = async () => {
    try {
      console.log(selectedSubjects);
      const response = await dispatch(assignSubjectsToTeacher( teacherId, selectedSubjects ));
      if(response.success){
        toast.success("Subjects assigned successfully");
        router.refresh();
      }
    } catch (error:any) {
      toast.error(error.message || "Failed to assign subjects");

    } finally {
      setIsAssignModalOpen(false);
    }
  };

  const handleRemoveSubject = async (subjectId: string) => {
    try {
      const response = await dispatch(removeSubjectFromTeacher(teacherId, subjectId));
      if(response.success){
        toast.success("Subject removed successfully");
        router.refresh();
      }
    } catch (error:any) {
      toast.error(error.message || "Failed to remove subject");
    }
  };

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
                <>
                  <button
                    onClick={() => setIsAssignModalOpen(true)}
                    className="bg-green-800 text-white px-3 py-1.5 cursor-pointer hover:bg-green-900"
                  >
                    Assign Subject
                  </button>
                  {isAssignModalOpen && (
                    <AssignSubjectModal
                      setIsModalOpen={setIsAssignModalOpen}
                      selectedSubjects={selectedSubjects}
                      handleSubjectToggle={handleSubjectToggle}
                      handleSaveSubjects={handleSaveSubjects}
                    />
                  )}
                </>
              </div>
              <div className="mt-2 space-y-1">
                {selectedTeacher?.subjects &&
                selectedTeacher.subjects.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedTeacher.subjects.map((subject) => (
                      <div
                        key={subject.subject_code}
                        className="inline-flex items-center gap-3 bg-green-50 border border-green-200 px-3 py-2"
                      >
                        <div>
                          <p className="text-green-800 text-sm font-semibold">
                            {subject.subject_name}
                          </p>
                          <p className="text-green-600 text-xs">
                            {subject.subject_code}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            handleRemoveSubject(subject.subject_id)
                          }
                          className="text-green-700 hover:text-red-600 hover:bg-red-50 rounded-full p-1"
                          title="Remove subject"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <p className="text-gray-500 text-sm">
                      No subjects assigned to this teacher.
                    </p>
                    <p className="text-green-700 text-sm mt-1">
                      Click Assign Subject to get started.
                    </p>
                  </div>
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
