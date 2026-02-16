import React, { useEffect, useState } from "react";
import axios from "axios";

const GuideBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/bookings/my-bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setBookings(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:4000/bookings/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchBookings();
    } catch (err) {
      console.error(err);
      alert("อัปเดตสถานะไม่สำเร็จ");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-24 px-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6">งานที่มีคนจอง</h1>

        {bookings.length === 0 ? (
          <p>ยังไม่มีการจอง</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="border p-4 rounded-lg mb-4"
            >
              <p><b>ทริป:</b> {booking.trip?.name}</p>
              <p><b>นักท่องเที่ยว:</b> {booking.tourist?.name}</p>
              <p><b>สถานะ:</b> {booking.status}</p>

              {booking.status === "pending" && (
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => updateStatus(booking.id, "confirmed")}
                    className="px-4 py-2 bg-green-600 text-white rounded"
                  >
                    รับงาน
                  </button>

                  <button
                    onClick={() => updateStatus(booking.id, "rejected")}
                    className="px-4 py-2 bg-red-600 text-white rounded"
                  >
                    ปฏิเสธ
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GuideBookings;
