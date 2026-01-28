import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const Guides = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async (search = "") => {
    try {
      setLoading(true);

      const url = search
        ? `http://localhost:4000/guides/q/${search}`
        : `http://localhost:4000/guides`;

      const res = await axios.get(url);
      setGuides(res.data.data);
    } catch (error) {
      console.error("Error fetching guides:", error);
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
            ไกด์ท่องเที่ยว
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-6">
            เลือกไกด์มืออาชีพ พร้อมพาคุณออกเดินทาง
          </p>
          <div className="mb-6 flex gap-2">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="ค้นหาไกด์"
              className="flex-1 border rounded-lg px-4 py-2"
            />
            <button
              onClick={() => fetchGuides(keyword)}
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
            <div className="text-center text-gray-500">กำลังโหลดข้อมูล...</div>
          )}

          {!loading && guides.length === 0 && (
            <div className="text-center text-gray-500">ไม่พบไกด์ที่ค้นหา</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, idx) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
                className="bg-white border rounded-lg p-5 hover:shadow-md transition"
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={guide.images}
                    alt={guide.name}
                    className="w-28 h-28 rounded-full object-cover border"
                  />
                </div>

                <h2 className="text-lg font-semibold text-gray-800 mb-1">
                  {guide.name}
                </h2>

                <p className="text-sm text-gray-500">
                  ภาษา: {guide.language || "ไม่ระบุ"}
                </p>

                <p className="text-sm text-gray-500">
                  ประสบการณ์: {guide.experience || "ไม่ระบุ"}
                </p>

                <p className="text-sm text-gray-500">โทร: {guide.tel || "-"}</p>

                <div className="flex items-center justify-between mt-4">
                  <span
                    className={`px-3 py-1 text-xs rounded-full ${
                      guide.status
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {guide.status ? "พร้อมให้บริการ" : "ไม่พร้อมให้บริการ"}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/guides/${guide.id}`)}
                  className="mt-4 w-full py-2 rounded bg-black text-white text-sm hover:bg-gray-800 transition"
                >
                  ดูโปรไฟล์ไกด์
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Guides;
