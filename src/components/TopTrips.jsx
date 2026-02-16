import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TopTrips = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/trips/top"
      );
      setTrips(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="max-w-6xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold mb-3 text-center">
        🔥 ทริปยอดนิยม
      </h2>
      <p className="text-center text-gray-500 mb-10">
        ทริปที่ถูกจองมากที่สุด
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {trips.map((trip, index) => (
          <Link
            to={`/trips/${trip.id}`}
            key={trip.id}
            className="group relative rounded-3xl overflow-hidden shadow-xl"
          >
            <img
              src={
                trip.picture
                  ? `http://localhost:4000/images/${trip.picture}`
                  : "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              }
              alt={trip.name}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
              #{index + 1}
            </div>

            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-xl font-semibold">
                {trip.name}
              </h3>
              <p className="text-sm">
                {trip.province?.name}
              </p>
              <p className="text-sm mt-1">
                ถูกจอง {trip._count?.bookings || 0} ครั้ง
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TopTrips;
