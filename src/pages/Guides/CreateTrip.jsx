import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Select from "react-select";

export default function CreateTrip() {
  const [form, setForm] = useState({
    name: "",
    provinceId: "",
    price: "",
    description: "",
    picture: null,
  });
  
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const res = await axios.get("http://localhost:4000/provinces");
        setProvinces(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (err) {
        console.error("โหลดจังหวัดไม่ได้", err);
        setProvinces([]);
      }
    };

    fetchProvinces();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("provinceId", form.provinceId);
      formData.append("price", form.price);
      formData.append("description", form.description);
      formData.append("guideId", localStorage.getItem("userId"));

      if (form.picture) {
        formData.append("picture", form.picture);
      }

      await axios.post("http://localhost:4000/trips", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/trips", { state: { success: true } });
    } catch (err) {
      console.error(err);
      alert("เพิ่มไม่สำเร็จ");
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
            เพิ่มทริปใหม่
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            สร้างประสบการณ์การท่องเที่ยวที่น่าจดจำ
          </p>
        </motion.div>
      </section>

      <section className="bg-[#F5F5F5] py-12">
        <div className="max-w-2xl mx-auto px-6">
          <motion.div
            className="bg-white border rounded-lg p-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* ชื่อทริป */}
              <input
                placeholder="ชื่อทริป"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              {/* จังหวัดแบบค้นหา + เลื่อน */}
              <Select
                options={provinces.map((p) => ({
                  value: p.id,
                  label: p.name,
                }))}
                placeholder="เลือกหรือค้นหาจังหวัด..."
                onChange={(selected) =>
                  setForm({ ...form, provinceId: selected.value })
                }
                isSearchable
                maxMenuHeight={200}
                className="text-black"
              />

              {/* ราคา */}
              <input
                type="number"
                placeholder="ราคา"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setForm({ ...form, price: e.target.value })
                }
              />

              {/* รูปภาพ */}
              <input
                type="file"
                accept="image/*"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setForm({ ...form, picture: e.target.files[0] })
                }
              />

              {/* รายละเอียด */}
              <textarea
                rows="4"
                placeholder="รายละเอียด"
                className="w-full border rounded-lg px-4 py-2"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <button className="w-full py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
                บันทึกทริป
              </button>

            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
