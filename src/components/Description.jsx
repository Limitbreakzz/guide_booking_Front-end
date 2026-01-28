import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const TripsDescription = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await axios.get("http://localhost:4000/trips");
      setTrips(res.data.data.slice(0, 6));
    } catch (error) {
      console.error("Error fetching trips:", error);
    }
  };

  return (
    <section className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-gray-800 text-center text-2xl font-bold mb-3">
        แนะนำทริปท่องเที่ยว
      </h2>
      <p className="text-center text-gray-600 mb-8">
        คัดสรรทริปคุณภาพ พร้อมไกด์มืออาชีพ
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trips.map((trip) => (
          <Link
            to={`/trips/${trip.id}`}
            key={trip.id}
            className="rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition flex flex-col"
          >
            <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm overflow-hidden">
                  {trip.images ? (
                    <img
                      src={trip.images}
                      alt={trip.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>ไม่มีรูปทริป</span>
                  )}
                </div>

            <div className="p-4 flex flex-col gap-2">
              <h3 className="font-semibold text-gray-800">
                {trip.name}
              </h3>

              <p className="text-sm text-gray-500">
                จังหวัด: {trip.province?.name || "-"}
              </p>

              <p className="text-sm text-gray-500">
                  ไกด์: {trip.guide?.name}
                </p>

              <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-medium">
                  {trip.price
                    ? `${trip.price.toLocaleString()} บาท`
                    : "สอบถามราคา"}
                </span>

                <span className="text-xs bg-black text-white px-3 py-1 rounded-lg">
                  ดูรายละเอียด
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TripsDescription;
