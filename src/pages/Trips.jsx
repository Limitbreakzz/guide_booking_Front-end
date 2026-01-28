import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async (keyword = "") => {
    try {
      setLoading(true);

      const searchText = keyword.trim();

      const url = searchText
        ? `http://localhost:4000/trips/q/${encodeURIComponent(searchText)}`
        : `http://localhost:4000/trips`;

      const res = await axios.get(url);
      setTrips(res.data.data);
    } catch (err) {
      console.error("Error fetching trips:", err);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-[#F5F5F5] min-h-[30vh] flex items-center justify-center py-24">
        <motion.div
          className="text-center px-6 w-full max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            ทริปท่องเที่ยวในประเทศ
          </h1>

          <p className="text-base md:text-lg text-gray-600 mb-6">
            เลือกทริปที่ใช่ พร้อมไกด์มืออาชีพ
          </p>
          <div className="mb-6 flex gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ค้นหาทริป / จังหวัด"
              className="flex-1 border rounded-lg px-4 py-1"
            />
            <button
              onClick={() => fetchTrips(search)}
              className="px-5 py-2 bg-black text-white rounded-lg"
            >
              ค้นหา
            </button>
          </div>
        </motion.div>
      </section>

      <section className="bg-[#F5F5F5] py-12">
        <div className="max-w-6xl mx-auto px-6">
          {loading && (
            <div className="text-center text-gray-500">
              กำลังโหลดข้อมูล...
            </div>
          )}

          {!loading && trips.length === 0 && (
            <div className="text-center text-gray-500">
              ไม่พบทริปที่ค้นหา
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, idx) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-white border rounded-lg p-5 hover:shadow-md transition"
              >
                <div className="h-40 bg-gray-200 overflow-hidden">
                  {trip.images ? (
                    <img
                      src={trip.images}
                      alt={trip.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                      ไม่มีรูปทริป
                    </div>
                  )}
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mt-2">
                  {trip.name}
                </h2>

                <p className="text-sm text-gray-500">
                  จังหวัด: {trip.province?.name}
                </p>

                <p className="text-sm text-gray-500">
                  ไกด์: {trip.guide?.name}
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="font-medium">
                    {trip.price
                      ? `${trip.price.toLocaleString()} บาท`
                      : "สอบถามราคา"}
                  </span>

                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      trip.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {trip.isActive ? "เปิดให้จอง" : "ปิดการจอง"}
                  </span>
                </div>

                {trip.isActive && (
                  <button
                    onClick={() => navigate(`/trips/${trip.id}`)}
                    className="mt-4 w-full py-2 rounded bg-black text-white hover:bg-gray-800"
                  >
                    ดูรายละเอียด / จองทริป
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
