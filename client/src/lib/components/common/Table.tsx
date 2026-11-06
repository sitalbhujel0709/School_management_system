import { Pen } from "lucide-react";
import React from "react";

const Table = ({ tableData }: { tableData: any[] }) => {

  const tableHeadings = ["Full Name", "Email", "Address", "Action"];
 
  console.log("Table Data:", tableData); // Log the tableData to check its structure
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
                    <td className="px-4 py-2 text-sm text-gray-600">{row.student_full_name}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{row.student_email}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{row.student_address}</td>
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
