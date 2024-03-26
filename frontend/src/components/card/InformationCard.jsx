import React from "react";

function InformationCard({ type, value }) {
  return (
    <div className="bg-[#e16383d9] text-gray-300 w-max px-2 py-1 flex text-sm rounded-md items-center justify-between gap-2 text-center">
      <p className="font-semibold">{type}:</p>
      <p>{value}</p>
    </div>
  );
}

export default InformationCard;
