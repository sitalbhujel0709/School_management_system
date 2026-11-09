"use client";
import DeleteModal from "@/lib/components/common/DeleteModal";
import Table from "@/lib/components/common/Table";
import SubjectModal from "@/lib/components/subjects/SubjectModal";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllSubjects } from "@/lib/store/subjects/subjectSlice";
import { Trash } from "lucide-react";
import React, { useEffect } from "react";
const ActionButton = ({ subjectId }: { subjectId: string }) => {
  const dispatch = useAppDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = React.useState<
    string | null
  >(subjectId);

  const handleDeleteClick = (id: string) => {
    setSelectedSubjectId(id);
    setIsDeleteModalOpen(true);
  }


  const handleConfirmDelete = async () => {
    if (!selectedSubjectId) return;
    try {
      setLoading(true);
      console.log("Deleting subject with ID:", selectedSubjectId);
      setIsDeleteModalOpen(false);
      setSelectedSubjectId(null);
      
    } catch (error) {
      console.error("Error deleting subject:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={() => handleDeleteClick(subjectId)} className=" text-red-600 p-1 cursor-pointer hover:bg-gray-200">
        <Trash size={18} />
      </button>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={loading}
        title="Delete Subject"
        message="Are you sure you want to delete this subject? This action cannot be undone."
      />
    </>
  );
};
const page = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    dispatch(getAllSubjects());
  }, [dispatch]);

  const subjects = useAppSelector((state) => state.subjects.subjects);
  const tableData = subjects.map((subject) => ({
    subject_name: subject.subject_name,
    subject_code: subject.subject_code,
    credit_hours: subject.credit_hours,
    class_name: subject.class_name,
    action: <ActionButton subjectId={subject.id} />,
  }));
  return (
    <div className="py-8 px-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-3xl font-bold text-green-800">Subjects</h3>
          <p className="text-gray-500">Manage your subjects here.</p>
        </div>
        <div>
          {isModalOpen && (
            <SubjectModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          )}
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-800 text-white px-4 py-2.5 cursor-pointer hover:bg-green-900"
          >
            Add Subject
          </button>
        </div>
      </div>
      <div>
        <Table
          tableData={tableData}
          tableHeadings={[
            "Subject Name",
            "Subject Code",
            "Credit Hours",
            "Class Name",
            "Action",
          ]}
        />
      </div>
    </div>
  );
};

export default page;
