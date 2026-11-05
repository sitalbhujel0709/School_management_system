import { Pen } from "lucide-react";
import React from "react";

const Table = () => {

  const tableHeadings = ["Full Name", "Email", "DOB", "Address", "Action"];
  const tableData = [
    {
      fullName: "John Doe",
      email: "john@example.com",
      dob: "1990-01-01",
      address: "123 Main St",
    },
    {
      fullName: "Jane Smith",
      email: "jane@example.com",
      dob: "1992-05-15",
      address: "456 Oak Ave",
    },
    {
      fullName: "Michael Johnson",
      email: "michael@example.com",
      dob: "1985-12-10",
      address: "789 Pine Rd",
    }
  ];

  return (
    <div className="p-2 overflow-y-auto">
      {/* head content of table */}
      <div className="mb-2">
        <h3 className="text-lg text-green-800 font-semibold mb-1">
          Class Details
        </h3>
        <p className="text-sm text-gray-500">
          view and manage all class members
        </p>
      </div>
      <div>
        <table className="w-full border border-gray-300">
          <thead className="bg-green-50 text-green-800 text-left p-2">
            <tr>
              {
                tableHeadings.map((heading,index)=>(
                  <th key={index} className={`px-4 py-2 font-medium`}>{heading}</th>
                ))
              }
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
             {
                tableData.map((row,index)=>(
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 text-sm text-gray-600">{row.fullName}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{row.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{row.dob}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{row.address}</td>
                    <td className="px-4 py-2">
                      <button className="px-1 cursor-pointer">
                        <Pen size={16} className="text-green-600"/>
                      </button>
                    </td>
                  </tr>
                ))
             }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
