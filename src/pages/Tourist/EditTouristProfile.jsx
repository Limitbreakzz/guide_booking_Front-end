import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import BackButton from "../../components/BackButton";

const EditTouristProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [picture, setPicture] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    tel: "",
    picture: null,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchTourist = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/tourists/${id}`
        );

        setForm({
          name: res.data.data.name || "",
          email: res.data.data.email || "",
          tel: res.data.data.tel || "",
          picture: null,
        });

        setPicture(res.data.data.picture || "");
      } catch {
        alert("โหลดข้อมูลไม่สำเร็จ");
      } finally {
        setLoading(false);
      }
    };

    fetchTourist();
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
          แก้ไขโปรไฟล์นักท่องเที่ยว
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={
              picture
                ? `http://localhost:4000/images/${picture}`
                : "/default-avatar.png"
            }
            alt={form.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
        </div>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              setSaving(true);

              const formData = new FormData();
              formData.append("name", form.name);
              formData.append("email", form.email);
              formData.append("tel", form.tel);

              if (form.picture) {
                formData.append("picture", form.picture);
              }

              await axios.put(
                `http://localhost:4000/tourists/${id}`,
                formData,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              alert("บันทึกข้อมูลเรียบร้อย");
              navigate(`/tourist/${id}`);
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
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="ชื่อ"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            placeholder="อีเมล"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            value={form.tel}
            onChange={(e) =>
              setForm({ ...form, tel: e.target.value })
            }
            placeholder="เบอร์โทร"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />

          <input
            type="file"
            onChange={(e) =>
              setForm({
                ...form,
                picture: e.target.files[0],
              })
            }
            className="w-full border rounded-lg px-3 py-2"
          />

          <button
            disabled={saving}
            className="w-full py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition disabled:opacity-50"
          >
            {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
          </button>
        </form>

        <div className="mt-auto pt-8">
          <BackButton label="กลับหน้าก่อนหน้า" />
        </div>
      </motion.div>
    </div>
  );
};

export default EditTouristProfile;
