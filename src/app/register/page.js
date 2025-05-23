"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    role: "user",
    phoneNumber: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFormValid = form.name && form.email && form.password && form.passwordRepeat && form.role && form.phoneNumber && form.password === form.passwordRepeat;

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registrasi berhasil!");
        router.push("/login");
      } else {
        alert(data.message || "Registrasi gagal");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat registrasi");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Buat Akun Baru</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input name="name" type="text" placeholder="Nama Lengkap" className="input" value={form.name} onChange={handleChange} />
          <input name="email" type="email" placeholder="Email" className="input" value={form.email} onChange={handleChange} />

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input pr-10"
              value={form.password}
              onChange={handleChange}
            />
            <div className="icon-eye" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>
          <div className="relative">
            <input
              name="passwordRepeat"
              type={showRepeatPassword ? "text" : "password"}
              placeholder="Ulangi Password"
              className="input pr-10"
              value={form.passwordRepeat}
              onChange={handleChange}
            />
            <div className="icon-eye" onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
              {showRepeatPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>

          <input name="phoneNumber" type="text" placeholder="Nomor Telepon" className="input" value={form.phoneNumber} onChange={handleChange} />

          <select name="role" className="input" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`button ${!isFormValid ? "bg-gray-600 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-4">
          Sudah punya akun?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
