import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import BackButton from "../components/BackButton";

const GuideProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [guide, setGuide] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      if (!id) return;

      const guideRes = await axios.get(
        `http://localhost:4000/guides/${id}`
      );
      setGuide(guideRes.data.data);

      const bookingRes = await axios.get(
        `http://localhost:4000/bookings?guideId=${id}`
      );

      const activeJobs = bookingRes.data.data.filter((b) =>
        ["pending", "confirmed", "ongoing"].includes(b.status)
      );

      setJobs(activeJobs);
    } catch (error) {
      console.error("Error fetching guide profile:", error);
      setGuide(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center">กำลังโหลดข้อมูล...</div>;
  }

  if (!guide) {
    return <div className="py-20 text-center">ไม่พบข้อมูลไกด์</div>;
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen flex justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-xl rounded-2xl shadow-md p-8 flex flex-col">

        <div className="flex justify-center mb-6">
          <img
            src={
              guide.images ||
              "https://cdn-icons-png.flaticon.com/512/847/847969.png"
            }
            alt={guide.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
        </div>

        <h1 className="text-2xl font-bold text-center text-gray-800">
          {guide.name}
        </h1>

        <p className="text-center text-gray-500 mb-6">ไกด์ (Guide)</p>

        <div className="space-y-4 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span>ประสบการณ์</span>
            <span className="font-medium">{guide.experience || "-"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>ภาษา</span>
            <span className="font-medium">{guide.language || "-"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>อีเมล</span>
            <span className="font-medium">{guide.email}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>เบอร์โทร</span>
            <span className="font-medium">{guide.tel || "-"}</span>
          </div>

          <div className="flex justify-between border-b pb-2">
            <span>วันที่สมัคร</span>
            <span className="font-medium">
              {new Date(guide.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-center pt-4">
            <span
              className={`px-4 py-1 text-sm rounded-full ${
                guide.status
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {guide.status ? "พร้อมให้บริการ" : "ไม่พร้อมให้บริการ"}
            </span>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            งานที่รับอยู่
          </h2>

          {jobs.length === 0 ? (
            <p className="text-sm text-gray-500">
              ยังไม่มีงานที่กำลังดำเนินอยู่
            </p>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="border rounded-lg p-4 flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {job.trip?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      นักท่องเที่ยว: {job.tourist?.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      วันที่:{" "}
                      {new Date(job.datetime).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      job.status === "pending" ? "bg-yellow-100 text-yellow-700": 
                      job.status === "confirmed" ? "bg-green-100 text-green-700": 
                      "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {job.status === "pending" ? "รอการยืนยัน" : job.status === "confirmed" ? "ยืนยันแล้ว" : "กำลังดำเนินงาน"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-2 mt-8">
          <button
            onClick={() => navigate(`/guides/${id}/edit`)}
            className="w-full py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition"
          >
            แก้ไขโปรไฟล์
          </button>
        </div>

        <div className="mt-auto pt-8">
          <BackButton label="กลับหน้าก่อนหน้า" />
        </div>
      </motion.div>
    </div>
  );
};

export default GuideProfile;
