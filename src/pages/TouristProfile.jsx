import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import BackButton from "../components/BackButton";

const Tourist = () => {
  const [tourists, setTourists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTourists();
  }, []);

  const fetchTourists = async () => {
    try {
      const res = await axios.get("http://localhost:4000/tourists");
      setTourists(res.data.data);
    } catch (error) {
      console.error("Error fetching tourists:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-[#F5F5F5] min-h-[30vh] flex items-center justify-center">
        <motion.div
          className="text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            นักท่องเที่ยว
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            รายชื่อนักท่องเที่ยวที่ใช้บริการ
          </p>
        </motion.div>
      </section>

      <section className="bg-[#F5F5F5] py-12">
        <div className="max-w-6xl mx-auto px-6">
          {loading && (
            <div className="text-center text-gray-500">กำลังโหลดข้อมูล...</div>
          )}

          {!loading && tourists.length === 0 && (
            <div className="text-center text-gray-500">
              ยังไม่มีนักท่องเที่ยว
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tourists.map((tourist, idx) => (
              <motion.div
                key={tourist.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-white border rounded-lg p-5 hover:shadow-md transition"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={tourist.images}
                    alt={tourist.name}
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                </div>

                <h2 className="text-lg font-semibold text-gray-800 text-center">
                  {tourist.name}
                </h2>

                <p className="text-sm text-gray-500 text-center">
                  {tourist.email}
                </p>

                <p className="text-sm text-gray-500 text-center mt-1">
                  โทร: {tourist.tel || "-"}
                </p>

                <button className="mt-4 w-full py-2 rounded bg-black text-white text-sm hover:bg-gray-800 transition">
                  ดูโปรไฟล์
                </button>
              </motion.div>
            ))}
          </div>          
        </div>
      </section>
    </>
  );
};

export default Tourist;
