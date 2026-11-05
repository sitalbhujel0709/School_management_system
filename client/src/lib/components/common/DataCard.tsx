import React from "react";

const DataCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  return (
    <div className="p-4 border border-gray-300 shadow-sm">
      <div>
        <h3 className="text-gray-500 text-sm uppercase">{title}</h3>
        <p className="mt-1 text-green-800 text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default DataCard;
