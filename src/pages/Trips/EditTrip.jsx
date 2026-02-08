import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import BackButton from "../../components/BackButton";

const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchTrip();
  }, [id]);

  const fetchTrip = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/trips/${id}`);
      const data = res.data.data;

      // กันไกด์คนอื่นเข้าแก้
      if (role !== "GUIDE" || Number(userId) !== data.guideId) {
        alert("คุณไม่มีสิทธิ์แก้ไขทริปนี้");
        navigate("/trips");
        return;
      }

      setTrip({
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        provinceId: data.provinceId || "",
        isActive: data.isActive,
        picture: null,
        pictureUrl: data.picture || "",
      });
    } catch (err) {
      console.error(err);
      alert("โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);

      const formData = new FormData();
      formData.append("name", trip.name);
      formData.append("description", trip.description);
      formData.append("price", trip.price);
      formData.append("provinceId", trip.provinceId);
      formData.append("isActive", trip.isActive);

      if (trip.picture) {
        formData.append("picture", trip.picture);
      }

      await axios.put(
        `http://localhost:4000/trips/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("แก้ไขทริปเรียบร้อย");
      navigate(`/trips/${id}`);
    } catch (err) {
      console.error(err);
      alert("บันทึกไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center">กำลังโหลด...</div>;
  }

  if (!trip) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-20 px-6">
      <div className="bg-white w-full max-w-xl p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          แก้ไขทริป
        </h1>

        <div className="flex justify-center mb-6">
          <img
            src={
              trip.picture
                ? URL.createObjectURL(trip.picture)
                : trip.pictureUrl
                ? `http://localhost:4000/images/${trip.pictureUrl}`
                : "https://via.placeholder.com/300x200"
            }
            alt="trip"
            className="w-60 h-40 object-cover rounded"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={trip.name}
            onChange={(e) =>
              setTrip({ ...trip, name: e.target.value })
            }
            placeholder="ชื่อทริป"
            className="w-full border rounded px-3 py-2"
          />

          <textarea
            value={trip.description}
            onChange={(e) =>
              setTrip({ ...trip, description: e.target.value })
            }
            placeholder="คำอธิบาย"
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="number"
            value={trip.price}
            onChange={(e) =>
              setTrip({ ...trip, price: e.target.value })
            }
            placeholder="ราคา"
            className="w-full border rounded px-3 py-2"
          />

          <input
            type="file"
            onChange={(e) =>
              setTrip({ ...trip, picture: e.target.files[0] })
            }
            className="w-full border rounded px-3 py-2"
          />

          <select
            value={trip.isActive}
            onChange={(e) =>
              setTrip({
                ...trip,
                isActive: e.target.value === "true",
              })
            }
            className="w-full border rounded px-3 py-2"
          >
            <option value="true">เปิดให้จอง</option>
            <option value="false">ปิดการจอง</option>
          </select>

          <button
            disabled={saving}
            className="w-full py-3 bg-black text-white rounded hover:bg-gray-800"
          >
            {saving ? "กำลังบันทึก..." : "บันทึกการแก้ไข"}
          </button>
        </form>

        <div className="mt-8">
          <BackButton label="ย้อนกลับ" />
        </div>
      </div>
    </div>
  );
};

export default EditTrip;
