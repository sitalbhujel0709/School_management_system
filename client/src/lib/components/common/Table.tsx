import { Pen } from "lucide-react";
import React from "react";

interface TableProps {
  tableData: any[];
  tableTitle?: string;
  tableDescription?: string;
  tableHeadings: string[];
  tableButton?: React.ReactNode;
}

const Table = ({
  tableData,
  tableTitle,
  tableDescription,
  tableHeadings,
  tableButton
}: TableProps) => {


  return (
    <div className="p-2 overflow-y-auto">
      {/* head content of table */}
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h3 className="text-lg text-green-800 font-semibold mb-1">
            {tableTitle || ""}
          </h3>
          <p className="text-sm text-gray-500">{tableDescription || ""}</p>
        </div>
        {
          tableButton && <div>{tableButton}</div>
        }
      </div>
      <div>
        <table className="w-full border border-gray-300">
          <thead className="bg-green-50 text-green-800 text-left p-2">
            <tr>
              {tableHeadings.map((heading, index) => (
                <th key={index} className={`px-4 py-2 font-medium`}>
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {tableData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {
                  row && Object.keys(row).map((key, index) => (
                    <td key={index} className="px-4 py-2 text-sm text-gray-600">
                      {row[key] || "N/A"}
                    </td>
                  ))
                }
                <td className="px-4 py-2">
                  <button className="px-1 cursor-pointer">
                    <Pen size={16} className="text-green-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
