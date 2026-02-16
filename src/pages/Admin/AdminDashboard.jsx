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
      totalTrips: 0,
      totalGuides: 0,
      totalTourists: 0,
      totalBookings: 0,
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            "http://localhost:4000/admin/dashboard",
          );

          setStats({
            trips: res.data.totalTrips,
            guides: res.data.totalGuides,
            tourists: res.data.totalTourists,
            bookings: res.data.totalBookings,
          });
        } catch (err) {
          console.error("Dashboard error:", err);
        }
      };

      fetchData();
    }, []);

    const chartData = [
      { name: "Trips", value: stats.trips },
      { name: "Guides", value: stats.guides },
      { name: "Tourists", value: stats.tourists },
      { name: "Bookings", value: stats.bookings },
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

            <div className="bg-white rounded-2xl shadow-md p-6">
              <p className="text-gray-500 text-sm">การจองทั้งหมด</p>
              <h2 className="text-4xl font-bold mt-2">{stats.bookings}</h2>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6 h-96">
            <h2 className="text-xl font-semibold mb-4">สถิติภาพรวมระบบ</h2>

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
