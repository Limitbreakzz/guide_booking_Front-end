import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("name", user.name);

      alert("Login สำเร็จ");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login ไม่สำเร็จ");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#F5F5F5]">
      <form
        onSubmit={handleLogin}
        className="w-96 bg-white p-8 rounded-xl shadow-md space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 transition">
          Login
        </button>

        <p className="text-sm text-center text-gray-600">
          ยังไม่มีบัญชี?{" "}
          <Link
            to="/register"
            className="text-black font-medium hover:underline"
          >
            สมัครสมาชิก
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
