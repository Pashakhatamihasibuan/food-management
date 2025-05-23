"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export const dynamic = "force-dynamic";

export default function FoodsPage() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      fetchFoods(token);
    }
  }, []);

  const fetchFoods = async (token) => {
    const res = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/foods", {
      cache: "no-store",
      headers: {
        apiKey: "w05KkI9AWhKxzvPFtXotUva-",
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    setFoods(data.data);
    setFilteredFoods(data.data);
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearch(keyword);
    const filtered = foods.filter((food) => food.name.toLowerCase().includes(keyword.toLowerCase()));
    setFilteredFoods(filtered);
    setCurrentPage(1);
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">🍽️ Food Explorer</h1>
        <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-xl shadow transition duration-300">
          Logout
        </button>
      </nav>
      {/* Search */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Cari makanan favoritmu..."
            className="w-full px-5 py-3 text-lg border rounded-2xl shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-12"
          />
          <FiSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-indigo-500 text-xl pointer-events-none" />
        </div>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentFoods.map((food) => (
          <Link key={food.id} href={`/foods/${food.id}`} className="group">
            <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">
              <Image
                src={food.imageUrl || "https://via.placeholder.com/400x300?text=No+Image"}
                alt={food.name}
                width={400}
                height={300}
                className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="p-5">
                <h2 className="text-xl font-semibold text-gray-800">{food.name}</h2>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{food.description || "Lezat dan bergizi! Coba sekarang dan rasakan kenikmatannya 🍴"}</p>
                <p className="text-indigo-600 font-bold mt-3">Rp{food.price || "25.000"}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-full font-semibold text-sm ${
                currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
