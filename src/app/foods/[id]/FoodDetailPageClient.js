"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FoodDetailPageClient({ id }) {
  const router = useRouter();
  const [food, setFood] = useState(null);

  useEffect(() => {
    async function fetchFood() {
      const res = await fetch(`https://api-bootcamp.do.dibimbing.id/api/v1/foods/${id}`, {
        headers: {
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        },
        cache: "no-store",
      });
      const data = await res.json();
      setFood(data.data);
    }
    fetchFood();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    await fetch(`https://api-bootcamp.do.dibimbing.id/api/v1/delete-food/${id}`, {
      method: "DELETE",
      headers: {
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        Authorization: `Bearer ${token}`,
      },
    });
    router.push("/foods");
  };

  if (!food) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Tombol Back */}
      <button onClick={() => router.back()} className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2" aria-label="Kembali">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Kembali
      </button>

      <h1 className="text-3xl font-bold mb-4">Detail Makanan</h1>

      <div className="bg-white shadow-md rounded p-4 mb-6">
        <Image src={food.imageUrl} alt={food.name} className="w-full max-h-64 object-cover rounded mb-4" width={800} height={400} priority />
        <h2 className="text-2xl font-semibold">{food.name}</h2>
        <p className="text-gray-700 mt-2">{food.description}</p>
        <h3 className="mt-4 font-semibold">Bahan-bahan:</h3>
        <p className="text-gray-600 whitespace-pre-line">{food.ingredients}</p>
      </div>

      <div className="flex space-x-4 mt-4">
        <button onClick={() => router.push(`/foods/edit/${id}`)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
          Edit
        </button>
        <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
    </div>
  );
}
