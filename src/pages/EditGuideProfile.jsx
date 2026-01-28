import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import BackButton from "../components/BackButton";

const EditGuideProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    tel: "",
    language: "",
    experience: "",
    images: "",
    status: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/guides/${id}`);
        setForm({
          name: res.data.data.name || "",
          email: res.data.data.email || "",
          tel: res.data.data.tel || "",
          language: res.data.data.language || "",
          experience: res.data.data.experience || "",
          images: res.data.data.images || "",
          status: Boolean(res.data.data.status),
        });
      } catch {
        alert("โหลดข้อมูลไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [id]);

  if (loading) {
    return <div className="py-20 text-center">กำลังโหลด...</div>;
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen flex justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white w-full max-w-xl rounded-2xl shadow-md p-8 flex flex-col"
      >
        <h1 className="text-2xl font-bold text-center mb-6">
          แก้ไขโปรไฟล์ไกด์
        </h1>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setSaving(true);
              await axios.put(`http://localhost:4000/guides/${id}`, form);
              alert("บันทึกข้อมูลเรียบร้อย");
              navigate(`/guides/${id}`);
            } catch {
              alert("บันทึกไม่สำเร็จ");
            } finally {
              setSaving(false);
            }
          }}
          className="space-y-4"
        >
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="ชื่อ"
            className="w-full border rounded px-3 py-2"
          />

          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="อีเมล"
            className="w-full border rounded px-3 py-2"
          />

          <input
            value={form.tel}
            onChange={(e) => setForm({ ...form, tel: e.target.value })}
            placeholder="เบอร์โทร"
            className="w-full border rounded px-3 py-2"
          />

          <input
            value={form.language}
            onChange={(e) => setForm({ ...form, language: e.target.value })}
            placeholder="ภาษา"
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            placeholder="ประสบการณ์"
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="text"
            value={form.images}
            onChange={(e) => setForm({ ...form, images: e.target.value })}
            placeholder="วางลิงก์รูป (.jpg, .png, .webp)"
            className="w-full border rounded px-3 py-2"
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value === "true" })
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value="true">พร้อมให้บริการ</option>
            <option value="false">ไม่พร้อมให้บริการ</option>
          </select>

          <button
            disabled={saving}
            className="w-full py-3 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
          </button>
        </form>

        <div className="mt-auto pt-8">
          <BackButton className="py-3 w-full" label="กลับหน้าก่อนหน้า" />
        </div>
      </motion.div>
    </div>
  );
};

export default EditGuideProfile;
