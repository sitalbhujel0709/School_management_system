"use client";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { getAllSubjects } from "@/lib/store/subjects/subjectSlice";
import { Search, X } from "lucide-react";
import React, { useEffect, useState } from "react";

interface AssignSubjectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  selectedSubjects: string[];
  handleSubjectToggle: (subjectCode:string)=>void;
  handleSaveSubjects: ()=>void;

}

const AssignSubjectModal = ({
  isModalOpen,
  setIsModalOpen,
  selectedSubjects,
  handleSubjectToggle,
  handleSaveSubjects
}: AssignSubjectModalProps) => {

  const dispatch = useAppDispatch()
  const [search, setSearch] = useState("");

  useEffect(()=>{
    dispatch(getAllSubjects())
  },[])

  const subjects = useAppSelector((state)=>state.subjects.subjects);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-lg  shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-green-800">Assign Subjects</h2>

          <button onClick={() => setIsModalOpen(false)}>
            <X />
          </button>
        </div>

        <p className="text-gray-500 text-sm mb-4">
          Select subjects to assign to this teacher.
        </p>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          
          <input
            type="text"
            placeholder="Search subjects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300  pl-10 pr-3 py-2 focus-within:outline-none"
          />
        </div>

        <div className="max-h-64 overflow-y-auto space-y-2">
          {subjects
            .filter((subject) =>
              subject.subject_name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((subject) => (
              <label
                key={subject.subject_code}
                className="flex items-center justify-between p-3  hover:bg-green-50 cursor-pointer border border-gray-300"
              >
                <div>
                  <p className="font-semibold text-green-800">
                    {subject.subject_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {subject.subject_code}
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={selectedSubjects.includes(subject.subject_code)}
                  onChange={() => handleSubjectToggle(subject.subject_code)}
                  className="accent-green-800 w-4 h-4"
                />
              </label>
            ))}
        </div>

        <div className="flex justify-between items-center mt-5">
          <p className="text-sm text-gray-500">
            {selectedSubjects.length} selected
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 border border-gray-300 text-green-800"
            >
              Cancel
            </button>

            <button
              onClick={handleSaveSubjects}
              className="px-4 py-2 bg-green-800 text-white hover:bg-green-900"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignSubjectModal;
