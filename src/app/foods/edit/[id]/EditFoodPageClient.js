"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function FoodEditPage({ id }) {
  const router = useRouter();

  const [food, setFood] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    ingredients: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchFood() {
      try {
        const res = await fetch(`https://api-bootcamp.do.dibimbing.id/api/v1/foods/${id}`, {
          headers: { apiKey: "w05KkI9AWhKxzvPFtXotUva-" },
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        setFood(data.data);
        setForm({
          name: data.data.name || "",
          description: data.data.description || "",
          imageUrl: data.data.imageUrl || "",
          ingredients: data.data.ingredients || "",
        });
      } catch (err) {
        console.error("Fetch error:", err.message);
      }
    }

    fetchFood();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const res = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/upload-image", {
        method: "POST",
        headers: { apiKey: "w05KkI9AWhKxzvPFtXotUva-" },
        body: formData,
      });

      const result = await res.json();
      setForm((prev) => ({ ...prev, imageUrl: result.url }));
    } catch (err) {
      console.error("Upload error:", err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`https://api-bootcamp.do.dibimbing.id/api/v1/update-food/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Gagal memperbarui makanan");

      alert("Makanan berhasil diperbarui!");
    } catch (err) {
      console.error("Submit error:", err.message);
      alert("Terjadi kesalahan saat menyimpan.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto animate-fadeIn">
      {/* Tombol Back */}
      <button onClick={() => router.back()} className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2" aria-label="Kembali">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </button>

      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Edit Makanan</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-100">
        {form.imageUrl && <Image src={form.imageUrl} alt={form.name} className="w-full h-64 object-cover rounded-xl" width={800} height={400} priority />}

        {/* Upload Gambar */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Upload Gambar Baru</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition"
          />
          {uploading && <p className="text-sm text-gray-500 mt-2">Mengunggah gambar...</p>}
        </div>

        {/* Input URL Gambar */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Atau Masukkan URL Gambar</label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://contoh.com/gambar.jpg"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
          />
          <p className="text-sm text-gray-500 mt-1">Masukkan URL gambar secara langsung jika tidak ingin meng-upload file.</p>
        </div>

        <div className="grid gap-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Nama"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none text-gray-500 focus:ring-2 focus:ring-indigo-500"
          />
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Deskripsi"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
          />
          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            placeholder="Bahan-bahan"
            rows={4}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
          />
        </div>

        <button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg w-full transition">
          Simpan Perubahan
        </button>
      </div>
    </div>
  );
}
