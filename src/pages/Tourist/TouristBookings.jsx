import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../../components/BackButton";

const TouristBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/bookings/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data.data);
    } catch (err) {
      console.error(err);
      alert("โหลดข้อมูลการจองไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        กำลังโหลด...
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          การจองของฉัน
        </h1>

        {bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
            ยังไม่มีการจอง
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition duration-300"
              >
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {booking.trip?.name}
                </h2>

                <p className="text-gray-600 mb-1">
                  ไกด์: {booking.guide?.name}
                </p>

                <p className="text-gray-600 mb-3">
                  วันที่:{" "}
                  {new Date(booking.datetime).toLocaleString("th-TH")}
                </p>

                <span
                  className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <BackButton label="ย้อนกลับ" />
        </div>
      </div>
    </div>
  );
};

export default TouristBookings;
