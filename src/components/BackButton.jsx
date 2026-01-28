import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "ย้อนกลับ" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
        {label}
    </button>
  );
};

export default BackButton;
