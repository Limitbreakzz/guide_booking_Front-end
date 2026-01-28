import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import BackButton from "../components/BackButton";

const TripDetail = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/trips/${id}`);
      setTrip(res.data.data);
    } catch (err) {
      console.error("Error fetching trip:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center">กำลังโหลดข้อมูล...</div>;
  }

  if (!trip) {
    return <div className="py-20 text-center">ไม่พบข้อมูลทริป</div>;
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="h-64 bg-gray-200 rounded-lg overflow-hidden mb-6">
          {trip.images ? (
            <img
              src={trip.images}
              alt={trip.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500">
              ไม่มีรูปทริป
            </div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-3">{trip.name}</h1>

          <p className="text-gray-600 mb-1">จังหวัด: {trip.province?.name}</p>

          <p className="text-gray-600 mb-1">คำอธิบาย: {trip.description}</p>

          <p className="text-gray-600 mb-1">ไกด์: {trip.guide?.name}</p>

          <p className="text-gray-600 mb-4">
            ราคา:{" "}
            {trip.price ? `${trip.price.toLocaleString()} บาท` : "สอบถามราคา"}
          </p>

          <span
            className={`inline-block px-4 py-1 text-sm rounded-full mb-6 ${
              trip.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {trip.isActive ? "เปิดให้จอง" : "ปิดการจอง"}
          </span>

          {trip.isActive && (
            <button
              onClick={() => navigate(`/booking/${trip.id}`)}
              className="w-full py-3 rounded-lg bg-black text-white text-base hover:bg-gray-800 transition"
            >
              จองทริปนี้
            </button>
          )}
          <div className="mt-12 flex">
            <BackButton label="ย้อนกลับ" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TripDetail;
