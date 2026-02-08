import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    trips: 0,
    guides: 0,
    tourists: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tripRes, guideRes, touristRes] = await Promise.all([
          axios.get("http://localhost:4000/trips"),
          axios.get("http://localhost:4000/guides"),
          axios.get("http://localhost:4000/tourists"),
        ]);

        setStats({
          trips: tripRes.data.data.length,
          guides: guideRes.data.data.length,
          tourists: touristRes.data.data.length,
        });
      } catch (err) {
        console.error("Dashboard error:", err);
      }
    };

    fetchData();

    // refresh ทุก 5 วิ (กึ่ง real-time)
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const chartData = [
    { name: "Trips", value: stats.trips },
    { name: "Guides", value: stats.guides },
    { name: "Tourists", value: stats.tourists },
  ];

  return (
    <div className="bg-[#F5F5F5] min-h-screen p-10 mt-15">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-500 text-sm">ทริปทั้งหมด</p>
            <h2 className="text-4xl font-bold mt-2">{stats.trips}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-500 text-sm">ไกด์ทั้งหมด</p>
            <h2 className="text-4xl font-bold mt-2">{stats.guides}</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6">
            <p className="text-gray-500 text-sm">นักท่องเที่ยว</p>
            <h2 className="text-4xl font-bold mt-2">{stats.tourists}</h2>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-96">
          <h2 className="text-xl font-semibold mb-4">
            สถิติภาพรวมระบบ
          </h2>

          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
