"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function FoodDetailPageClient({ id }) {
  const router = useRouter();
  const [food, setFood] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

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

  if (!food) return <div className="p-6 text-center text-gray-600">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Tombol Back */}
      <button onClick={() => router.back()} className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2 transition">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <h1 className="text-3xl font-bold text-indigo-500 mb-6">Food Details</h1>

      <div className="bg-white shadow-lg rounded-xl p-6 space-y-4 transition">
        <Image src={food.imageUrl} alt={food.name} className="w-full max-h-64 object-cover rounded-lg" width={800} height={400} priority />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{food.name}</h2>
          <h3 className="font-semibold text-gray-700 mt-5">Description</h3>
          <p className="text-gray-600 mt-2">{food.description}</p>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-1">Ingredients:</h3>
          <p className="text-gray-600 whitespace-pre-line">{food.ingredients}</p>
        </div>
      </div>

      <div className="flex space-x-4 mt-6">
        <button onClick={() => router.push(`/foods/edit/${id}`)} className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition">
          Edit
        </button>
        <button onClick={() => setShowConfirm(true)} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition">
          Delete
        </button>
      </div>

      {/* Modal Konfirmasi */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Konfirmasi Hapus</h2>
            <p className="text-gray-600">Apakah kamu yakin ingin menghapus makanan ini? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex justify-end space-x-3">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                Batal
              </button>
              <button onClick={handleDelete} className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition">
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
