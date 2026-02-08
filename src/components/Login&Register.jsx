import React from "react";
import { useNavigate } from "react-router-dom";

const AuthButtons = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload(); 
  };

  if (!token) {
    return (
      <div className="flex gap-3">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
        >
          เข้าสู่ระบบ
        </button>

        <button
          onClick={() => navigate("/register")}
          className="px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition"
        >
          สมัครสมาชิก
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-700 font-medium">
        {role === "ADMIN" && "Admin"}
        {role === "GUIDE" && "Guide"}
        {role === "TOURIST" && "Tourist"}
      </span>

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default AuthButtons;
