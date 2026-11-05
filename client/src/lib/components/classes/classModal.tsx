"use client";
import { createClass } from "@/lib/store/classes/classSlice";
import { IClass } from "@/lib/store/classes/classSlice.type";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";

interface ClassModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}
const classModal = ({ isModalOpen, setIsModalOpen }: ClassModalProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  const [classData, setClassData] = useState({
    className: "",
    classLevel: "",
    capacity: 0,
    seatsAvailable: 0,
  })
  const {loading} = useAppSelector((state)=> state.classes);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClassData((prevData) => ({
      ...prevData,
      [name]: name === "className" ? value : Number(value),
    }));
  }

  const handleSubmit =async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!classData.className || !classData.classLevel || !classData.capacity || !classData.seatsAvailable) {
      alert("Please fill all fields");
      return;
    }
    try {
      const response = await dispatch(createClass(classData));
      if(response.success){
        setIsModalOpen(false);
        router.refresh();
        toast.success("Class created successfully");
      }
    } catch (error) {
      console.log(error);
      setIsModalOpen(false);
      toast.error("Failed to create class");
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

  if (!isModalOpen) return null;

  return (
    <div className="h-screen flex bg-black/20 backdrop-blur-xs items-center justify-center fixed inset-0 z-100">
      <div ref={modalRef} className="bg-white p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-green-800">Create Class</h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1"
          >
            <X size={18} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="class_name" className="text-sm block">
              Class Name
            </label>
            <div className="flex border border-gray-300 px-3 py-1.5">
              <input
                type="text"
                id="class_name"
                name="className"
                value={classData.className}
                onChange={handleInputChange}
                className="focus-within:outline-none w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="class_level" className="text-sm block">
              Class Level
            </label>
            <div className="flex border border-gray-300 px-3 py-1.5">
              <input
                type="number"
                id="class_level"
                name="classLevel"
                min={1}
                max={15}
                value={classData.classLevel}
                onChange={handleInputChange}
                className="focus-within:outline-none w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="class_capacity" className="text-sm block">
              Class Capacity
            </label>
            <div className="flex border border-gray-300 px-3 py-1.5">
              <input
                type="number"
                id="class_capacity"
                name="capacity"
                min={1}
                max={30}
                value={classData.capacity}
                onChange={handleInputChange}
                className="focus-within:outline-none w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="seats_available" className="text-sm block">
              Seats Available
            </label>
            <div className="flex border border-gray-300 px-3 py-1.5">
              <input
                type="number"
                id="seats_available"
                name="seatsAvailable"
                min={0}
                max={30}
                value={classData.seatsAvailable}
                onChange={handleInputChange}
                className="focus-within:outline-none w-full"
              />
            </div>
          </div>
          <div>
            <button disabled={loading} type="submit" className={` disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed bg-green-800 px-4 py-2 text-white hover:bg-green-900 cursor-pointer`}>
              Create
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default classModal;
