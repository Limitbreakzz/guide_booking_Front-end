import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import BackButton from "../../components/BackButton";

const TouristProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tourist, setTourist] = useState(null);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  const isOwner =
    role === "TOURIST" && String(userId) === String(id);

  useEffect(() => {
    fetchTourist();
  }, [id]);

  const fetchTourist = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/tourists/${id}`
      );
      setTourist(res.data.data);
    } catch (err) {
      console.error("Error fetching tourist:", err);
      setTourist(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center">กำลังโหลดข้อมูล...</div>;
  }

  if (!tourist) {
    return <div className="py-20 text-center">ไม่พบข้อมูล</div>;
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen flex justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-xl rounded-2xl shadow-md p-8 flex flex-col"
      >
        <div className="flex justify-center mb-6">
          <img
            src={
              tourist.picture
                ? `http://localhost:4000/images/${tourist.picture}`
                : "/default-avatar.png"
            }
            alt={tourist.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800">
          {tourist.name}
        </h1>

        <p className="text-center text-gray-500 mb-6">
          นักท่องเที่ยว (Tourist)
        </p>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span>อีเมล</span>
            <span className="font-medium">{tourist.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>เบอร์โทร</span>
            <span className="font-medium">{tourist.tel || "-"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>วันที่สมัคร</span>
            <span className="font-medium">
              {new Date(tourist.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* ปุ่มแก้ไข (เฉพาะเจ้าของ) */}
        {isOwner && (
          <div className="space-y-2 mt-8">
            <button
              onClick={() => navigate(`/tourist/${id}/edit`)}
              className="w-full py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition"
            >
              แก้ไขโปรไฟล์
            </button>
          </div>
        )}

        <div className="mt-auto pt-8">
          <BackButton label="กลับหน้าก่อนหน้า" />
        </div>
      </motion.div>
    </div>
  );
};

export default TouristProfile;
