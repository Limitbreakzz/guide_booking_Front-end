import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchMyTrips();
  }, []);

  const fetchMyTrips = async () => {
    try {
      const res = await axios.get("http://localhost:4000/trips");

      // กรองเฉพาะทริปของไกด์คนนี้
      const myTrips = res.data.data.filter(
        (trip) => trip.guideId === Number(userId)
      );

      setTrips(myTrips);
    } catch (err) {
      console.error("Error fetching trips:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center">กำลังโหลด...</div>;
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">ทริปของฉัน</h1>

        {trips.length === 0 ? (
          <div className="text-gray-500">ยังไม่มีทริป</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
                onClick={() => navigate(`/trips/${trip.id}`)}
              >
                <div className="h-40 bg-gray-200 rounded mb-3 overflow-hidden">
                  {trip.picture ? (
                    <img
                      src={`http://localhost:4000/images/${trip.picture}`}
                      alt={trip.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      ไม่มีรูป
                    </div>
                  )}
                </div>

                <h2 className="font-semibold">{trip.name}</h2>

                <p className="text-sm text-gray-500">
                  {trip.price
                    ? `${trip.price.toLocaleString()} บาท`
                    : "สอบถามราคา"}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <BackButton label="ย้อนกลับ" />
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
