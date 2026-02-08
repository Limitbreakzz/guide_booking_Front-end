import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    tel: "",
    language: "",
    experience: "",
    role: "TOURIST"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/auth/register", form);

      alert("สมัครสมาชิกสำเร็จ");
      navigate("/login"); 
    } catch (err) {
      alert("สมัครไม่สำเร็จ");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-96 bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">สมัครสมาชิก</h2>

        <div className="flex gap-4 justify-center">
          <button
            type="button"
            onClick={() => setForm({ ...form, role: "TOURIST" })}
            className={`px-4 py-2 rounded-lg border ${
              form.role === "TOURIST"
                ? "bg-black text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Tourist
          </button>

          <button
            type="button"
            onClick={() => setForm({ ...form, role: "GUIDE" })}
            className={`px-4 py-2 rounded-lg border ${
              form.role === "GUIDE"
                ? "bg-black text-white"
                : "bg-white text-gray-700"
            }`}
          >
            Guide
          </button>
        </div>

        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <input
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <input
          placeholder="Tel"
          onChange={(e) => setForm({ ...form, tel: e.target.value })}
          className="w-full border p-2 rounded"
        />

        {form.role === "GUIDE" && (
          <>
            <input
              placeholder="Language"
              onChange={(e) =>
                setForm({ ...form, language: e.target.value })
              }
              className="w-full border p-2 rounded"
            />

            <textarea
              placeholder="Experience"
              onChange={(e) =>
                setForm({ ...form, experience: e.target.value })
              }
              className="w-full border p-2 rounded"
            />
          </>
        )}

        <button className="w-full bg-black text-white p-2 rounded-lg hover:bg-gray-800 transition">
          สมัครสมาชิก
        </button>

        <p className="text-sm text-center text-gray-600">
          มีบัญชีอยู่แล้ว?{" "}
          <Link
            to="/login"
            className="text-black font-medium hover:underline"
          >
            เข้าสู่ระบบ
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
