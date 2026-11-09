
import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Delete",
  message = "Are you sure you want to delete?",
  loading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm bg-white p-6 shadow-xl">
        <h2 className="mb-3 text-xl font-semibold text-green-800">
          {title}
        </h2>

        <p className="mb-6 text-gray-500">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className=" border border-gray-300 px-5 py-2 text-green-800 hover:bg-gray-100 cursor-pointer disabled:opacity-50"
          >
            No
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className=" bg-red-600 px-5 py-2 text-white cursor-pointer hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
