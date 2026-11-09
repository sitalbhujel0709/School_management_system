import { getAllClasses } from "@/lib/store/classes/classSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { createSubject } from "@/lib/store/subjects/subjectSlice";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";

interface SubjectTypes {
  subject_name: string;
  subject_code: string;
  credit_hours: number;
  class_id: string;
}

const SubjectModal = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    dispatch(getAllClasses())
  },[dispatch])
  const classes = useAppSelector((state) => state.classes.classes);

  const [subjectData, setSubjectData] = React.useState<SubjectTypes>({
    subject_name: "",
    subject_code: "",
    credit_hours: 0,
    class_id: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "credit_hours") {
      setSubjectData((prevData) => ({
        ...prevData,
        [name]: Number(value),
      }));
      return;
    }
    setSubjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateInput = (formData: SubjectTypes)=>{
    const {subject_name, subject_code, credit_hours, class_id} = formData;
    console.log(formData)
    if(!subject_name.trim() || !subject_code.trim() || !credit_hours || !class_id){
      return false;
    }
    return true;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(!validateInput(subjectData)){
        toast.error("Please fill all the fields correctly");
        return;
      }
      const response = await dispatch(createSubject(subjectData));
      if (response.success) {
        setIsModalOpen(false);
        router.refresh();
        toast.success("Subject created successfully");
      }
    } catch (error:any) {
      console.log(error);
      toast.error(error.message || "Failed to create subject");
      setIsModalOpen(false);
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
    <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white max-w-sm w-full shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-green-800">
            Create Subject
          </h3>
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
              htmlFor="subject_name"
              className="block text-sm font-medium text-gray-700"
            >
              Subject Name
            </label>

            <div className="flex border border-gray-300 px-3 py-1.5">
              <input
                type="text"
                name="subject_name"
                id="subject_name"
                value={subjectData.subject_name}
                onChange={handleInputChange}
                className="focus-within:outline-none w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject_code">Subject Code</label>
            <div className="flex border border-gray-300 px-3 py-1.5">
              <input
                type="text"
                name="subject_code"
                id="subject_code"
                value={subjectData.subject_code}
                onChange={handleInputChange}
                className="focus-within:outline-none w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="credit_hours">Credit Hours</label>
            <div className="flex border border-gray-300 px-3 py-1.5">
              <input
                type="number"
                name="credit_hours"
                id="credit_hours"
                value={subjectData.credit_hours}
                onChange={handleInputChange}
                className="focus-within:outline-none w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="class_id">Class</label>
            <div className="flex border border-gray-300 px-3 py-1.5">
              <select name="class_id" id="class_id" onChange={handleInputChange} value={subjectData.class_id} className="focus-within:outline-none w-full">
                <option value="">Select a class</option>
                {
                  classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.class_name}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>
          <div>
            <button className="bg-green-800 px-4 py-2 text-white cursor-pointer hover:bg-green-900">
              Create Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubjectModal;
