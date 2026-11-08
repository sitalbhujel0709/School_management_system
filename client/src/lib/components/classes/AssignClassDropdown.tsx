
"use client";

import React, { useState } from "react";

interface ClassOption {
  id: string;
  class_name: string;
}

interface AssignClassDropdownProps {
  classes: ClassOption[];
  onAssign: (classId: string) => void;
  loading?: boolean;
}

const AssignClassDropdown = ({
  classes,
  onAssign,
  loading = false,
}: AssignClassDropdownProps) => {
  const [selectedClass, setSelectedClass] = useState("");

  const handleAssign = () => {
    if (!selectedClass) return;

    onAssign(selectedClass);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        value={selectedClass}
        onChange={(e) => setSelectedClass(e.target.value)}
        className="border border-gray-300 px-3 py-2.5 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-700"
      >
        <option value="">Select Class</option>

        {classes.map((classItem) => (
          <option key={classItem.id} value={classItem.id}>
            {classItem.class_name}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={handleAssign}
        disabled={!selectedClass || loading}
        className="px-4 py-2.5 bg-green-800 text-white hover:bg-green-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Assigning..." : "Assign"}
      </button>
    </div>
  );
};

export default AssignClassDropdown;
