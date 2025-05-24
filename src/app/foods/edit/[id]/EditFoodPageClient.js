"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function FoodEditPage({ id }) {
  const router = useRouter();

  const [food, setFood] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    ingredients: "",
    price: "",
    priceDiscount: "",
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
          ingredients: data.data.ingredients?.join(", ") || "",
          price: data.data.price?.toString() || "",
          priceDiscount: data.data.priceDiscount?.toString() || "",
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
    const payload = {
      name: form.name,
      description: form.description,
      imageUrl: form.imageUrl,
      ingredients: form.ingredients.split(",").map((item) => item.trim()),
      price: Number(form.price),
    };

    if (form.priceDiscount.trim() !== "") {
      payload.priceDiscount = Number(form.priceDiscount);
    }

    try {
      setUploading(true);

      const res = await fetch(`https://api-bootcamp.do.dibimbing.id/api/v1/update-food/${food.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJjYTIzZDdjYy02Njk1LTQzNGItODE2Yy03ZTlhNWMwNGMxNjQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE4NzUzMjF9.wV2OECzC25qNujtyb9YHyzYIbYEV-wud3TQsYv7oB4Q",
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Gagal memperbarui menu.");
      }

      Swal.fire("Sukses", "Menu berhasil diperbarui!", "success").then(() => {
        router.push("/foods");
      });
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto animate-fadeIn">
      <button onClick={() => router.back()} className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2" aria-label="Kembali">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h1 className="text-4xl font-bold text-indigo-700 mb-6">Edit Food</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-6 border border-gray-100">
        {form.imageUrl && <Image src={form.imageUrl} alt={form.name} className="w-full h-64 object-cover rounded-xl" width={800} height={400} priority />}

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Upload New Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full border border-gray-300 rounded-lg p-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition"
          />
          {uploading && <p className="text-sm text-gray-500 mt-2">Uploading images or saving changes...</p>}
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">Or Enter Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            placeholder="https://contoh.com/gambar.jpg"
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-500"
          />
        </div>

        <div className="grid gap-4">
          <label className="block font-semibold text-gray-700 mb-2">Food Name</label>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Nama" className="border border-gray-300 rounded-lg p-3 w-full" />
          <label className="block font-semibold text-gray-700 mb-2">Description</label>
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Deskripsi"
            className="border border-gray-300 rounded-lg p-3 w-full"
          />
          <label className="block font-semibold text-gray-700 mb-2">Ingredients</label>
          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            placeholder="Bahan-bahan (pisahkan dengan koma)"
            rows={3}
            className="border border-gray-300 rounded-lg p-3 w-full"
          />
          <label className="block font-semibold text-gray-700 mb-2">Price</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Harga"
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
          />
          <label className="block font-semibold text-gray-700 mb-2">Price Discount</label>
          <input
            name="priceDiscount"
            value={form.priceDiscount}
            onChange={handleChange}
            placeholder="Diskon Harga (Opsional)"
            type="number"
            className="border border-gray-300 rounded-lg p-3 w-full"
          />
        </div>

        <button onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg w-full transition">
          Save Changes
        </button>
      </div>
    </div>
  );
}
