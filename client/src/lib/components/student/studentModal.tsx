import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { createStudent } from "@/lib/store/students/studentSlice";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface StudentModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const studentModal = ({ isModalOpen, setIsModalOpen }: StudentModalProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const [studentData, setStudentData] = useState({
    full_name: "",
    email: "",
    date_of_Birth: "",
    address: "",
  });

  const { loading, error } = useAppSelector((state) => state.classes);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await dispatch(createStudent(studentData));
      if (response.success) {
        setIsModalOpen(false);
        router.refresh();
        toast.success("Student created successfully");
      }
    } catch (error) {
      console.log(error);
      setIsModalOpen(false);
      toast.error("Failed to create student");
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, setIsModalOpen]);

  return (
    <div className="h-screen flex bg-black/20 backdrop-blur-xs items-center justify-center fixed inset-0 z-100">
      <div ref={modalRef} className="bg-white p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-green-800">
            Create Student
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="full_name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <div className="flex border border-gray-300 px-3 py-1.5">
              <input
                type="text"
                name="full_name"
                id="full_name"
                value={studentData.full_name}
                onChange={handleInputChange}
                className="focus-within:outline-none w-full"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="flex border border-gray-300 px-3 py-1.5">
              <input
                type="email"
                name="email"
                id="email"
                value={studentData.email}
                onChange={handleInputChange}
                className="focus-within:outline-none w-full"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="date_of_Birth"
              className="block text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <div className="flex border border-gray-300 px-3 py-1.5">
              <input
                type="date"
                name="date_of_Birth"
                id="date_of_Birth"
                value={studentData.date_of_Birth}
                onChange={handleInputChange}
                className="focus-within:outline-none w-full"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <div className="flex border border-gray-300 px-3 py-1.5">
              <input
                type="text"
                name="address"
                id="address"
                value={studentData.address}
                onChange={handleInputChange}
                className="focus-within:outline-none w-full "
              />
            </div>
          </div>
          <div>
            <button
              disabled={loading}
              type="submit"
              className={` disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed bg-green-800 px-4 py-2 text-white hover:bg-green-900 cursor-pointer`}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default studentModal;
