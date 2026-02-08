import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "react-feather";
import AuthButtons from "./Login&Register";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId"); // ใช้ตัวเดียวพอ

  const renderMenuByRole = () => {
    if (!token) {
      return (
        <>
          <Link to="/" className="text-gray-800 no-underline">หน้าแรก</Link>
          <Link to="/trips" className="text-gray-800 no-underline">ทริปต่างๆ</Link>
          <Link to="/guides" className="text-gray-800 no-underline">ไกด์</Link>
          <Link to="/about" className="text-gray-800 no-underline">เกี่ยวกับ</Link>
          <Link to="/contact" className="text-gray-800 no-underline">ติดต่อ</Link>
        </>
      );
    }

    if (role === "TOURIST") {
      return (
        <>
          <Link to="/" className="text-gray-800 no-underline">หน้าแรก</Link>
          <Link to="/trips" className="text-gray-800 no-underline">ทริปต่างๆ</Link>
          <Link to="/guides" className="text-gray-800 no-underline">ไกด์</Link>
          <Link to="/tourist-bookings" className="text-gray-800 no-underline">การจองของฉัน</Link>
          <Link to={`/tourist/${userId}`} className="text-gray-800 no-underline">
            โปรไฟล์
          </Link>
        </>
      );
    }

    if (role === "GUIDE") {
      return (
        <>
          <Link to="/" className="text-gray-800 no-underline">หน้าแรก</Link>
          <Link to="/trips" className="text-gray-800 no-underline">ทริปทั้งหมด</Link>
          <Link to="/my-trips" className="text-gray-800 no-underline">ทริปของฉัน</Link>
          <Link to="/create-trip" className="text-gray-800 no-underline">เพิ่มทริป</Link>
          <Link to="/guide-bookings" className="text-gray-800 no-underline">งานของฉัน</Link>
          {userId && (<><Link to={`/guides/${userId}`}className="text-gray-800 no-underline">ดูโปรไฟล์</Link></>)}
        </>
      );
    }

    if (role === "ADMIN") {
      return (
        <>
          <Link to="/admin/dashboard" className="text-gray-800 no-underline">
            Dashboard
          </Link>
          <Link to="/admin/trips" className="text-gray-800 no-underline">
            จัดการทริป
          </Link>
          <Link to="/admin/guides" className="text-gray-800 no-underline">
            จัดการไกด์
          </Link>
          <Link to="/admin/tourists" className="text-gray-800 no-underline">
            จัดการนักท่องเที่ยว
          </Link>
        </>
      );
    }

    return null;
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 bg-gray-100/90 backdrop-blur shadow z-50">

      <Link to="/" className="flex items-center gap-2 no-underline">
        <img src="/img/icon.png" alt="Logo" className="h-8 w-auto" />
        <span className="font-bold text-2xl text-gray-800">
          Guide Booking
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-6">
        {renderMenuByRole()}
        <div className="flex gap-3 ml-4">
          <AuthButtons />
        </div>
      </div>

      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-full right-4 mt-2 bg-white shadow-lg rounded-lg flex flex-col items-start p-4 gap-3 md:hidden w-56">
          {renderMenuByRole()}
          <div className="pt-2 border-t w-full">
            <AuthButtons />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
