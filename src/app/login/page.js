"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFormValid = email && password;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token); // ✅ Simpan token
        alert("Login berhasil!");
        router.push("/foods"); // ✅ Redirect ke halaman daftar makanan
      } else {
        alert(data.message || "Login gagal");
      }
    } catch (error) {
      alert("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Selamat Datang</h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <input type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="input pr-10"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="icon-eye" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`button ${!isFormValid ? "bg-gray-600 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}`}
          >
            {loading ? "Memproses..." : "Login"}
          </button>
        </form>
        <p className="text-center text-gray-400 text-sm mt-4">
          Belum punya akun?{" "}
          <Link href="/register" className="text-indigo-400 hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
