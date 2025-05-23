"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateFoodPage() {
  const [form, setForm] = useState({ name: "", description: "", imageUrl: "", ingredients: "" });
  const router = useRouter();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/create-food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/foods");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tambah Makanan</h1>
      <input name="name" onChange={handleChange} placeholder="Nama" className="input" />
      <input name="description" onChange={handleChange} placeholder="Deskripsi" className="input" />
      <input name="imageUrl" onChange={handleChange} placeholder="URL Gambar" className="input" />
      <textarea name="ingredients" onChange={handleChange} placeholder="Bahan" className="input" />
      <button onClick={handleSubmit} className="btn bg-green-600 text-white mt-4">
        Submit
      </button>
    </div>
  );
}
