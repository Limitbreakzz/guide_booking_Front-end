import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../components/BackButton";

const Booking = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [datetime, setDatetime] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/trips/${tripId}`)
      .then((res) => setTrip(res.data.data))
      .catch(() => alert("โหลดข้อมูลทริปไม่สำเร็จ"));
  }, [tripId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!datetime) {
      alert("กรุณาเลือกวันและเวลา");
      return;
    }

    if (!token) {
      alert("กรุณาเข้าสู่ระบบก่อนจอง");
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:4000/bookings",
        {
          tripId: Number(tripId),
          datetime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("จองทริปสำเร็จ");
      navigate("/trips");
    } catch (error) {
      console.error(error.response);
      alert(error.response?.data?.message || "เกิดข้อผิดพลาดในการจอง");
    } finally {
      setLoading(false);
    }
  };

  if (!trip) {
    return <div className="py-20 text-center">กำลังโหลด...</div>;
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-24 px-6">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-4">จองทริป</h1>

        <p className="text-gray-700 mb-2">
          ทริป: <b>{trip.name}</b>
        </p>
        <p className="text-gray-700 mb-2">ไกด์: {trip.guide?.name}</p>
        <p className="text-gray-700 mb-6">
          ราคา: {trip.price?.toLocaleString()} บาท
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />

          <button
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "กำลังจอง..." : "ยืนยันการจอง"}
          </button>

          <div className="mt-6 flex">
            <BackButton label="ย้อนกลับ" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
