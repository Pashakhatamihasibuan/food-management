"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiLogOut, FiHeart, FiStar, FiPlus } from "react-icons/fi";
import { FaUtensils, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

export const dynamic = "force-dynamic";

export default function FoodsPage() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [likedFoods, setLikedFoods] = useState(new Set());
  const itemsPerPage = 6;
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchFoods(token);
  }, []);

  const fetchFoods = async (token) => {
    try {
      const res = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/foods", {
        cache: "no-store",
        headers: {
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFoods(data.data);
      setFilteredFoods(data.data);
    } catch (error) {
      console.error("Failed to fetch foods:", error);
    }
  };

  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearch(keyword);
    const filtered = foods.filter((food) => food.name.toLowerCase().includes(keyword.toLowerCase()));
    setFilteredFoods(filtered);
    setCurrentPage(1);
  };

  const toggleLike = (foodId) => {
    setLikedFoods((prev) => {
      const newSet = new Set(prev);
      newSet.has(foodId) ? newSet.delete(foodId) : newSet.add(foodId);
      return newSet;
    });
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-8 sm:px-6 lg:px-8">
      {/* Navbar */}
      <nav className="flex justify-between items-center mb-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
            <FaUtensils className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Food Explorer</h1>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={logout}
          className="flex items-center space-x-2 bg-white text-red-500 hover:text-white hover:bg-red-500 font-medium px-4 py-2 rounded-xl shadow-md transition-all duration-300 border border-red-100"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </motion.button>
      </nav>

      {/* Search and Create */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full max-w-2xl"
        >
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search for your favorite food..."
            className="w-full px-6 py-4 text-lg border-0 placeholder:text-gray-400 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-200 text-gray-800 pr-16 transition-all duration-300"
          />
          <FiSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 text-indigo-500 text-2xl pointer-events-none" />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/foods/create")}
          className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl shadow-md transition-all duration-300 whitespace-nowrap"
        >
          <FiPlus className="text-lg" />
          <span>Create Food</span>
        </motion.button>
      </div>

      {/* Food Cards */}
      {currentFoods.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentFoods.map((food, index) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-100">
                <div className="relative overflow-hidden h-60">
                  <Link href={`/foods/${food.id}`}>
                    <Image
                      src={food.imageUrl || "/food-placeholder.jpg"}
                      alt={food.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover w-full hover:scale-105 transition-transform duration-500"
                      priority={index < 3} // Only prioritize first few images
                    />
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(food.id);
                    }}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-sm hover:scale-110 transition-transform"
                    aria-label={likedFoods.has(food.id) ? "Unlike this food" : "Like this food"}
                  >
                    {likedFoods.has(food.id) ? <FaHeart className="text-red-500 text-xl" /> : <FiHeart className="text-gray-500 hover:text-red-500 text-xl" />}
                  </button>
                </div>
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{food.name}</h2>
                    <div className="flex items-center bg-amber-100 px-2 py-1 rounded-full">
                      <FiStar className="text-amber-500 mr-1" />
                      <span className="text-sm font-medium text-amber-800">4.8</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-2">{food.description || "Delicious and nutritious! Try it now and taste the perfection."}</p>
                  <div className="mt-auto">
                    <p className="text-2xl font-bold text-indigo-600">{food.price ? `Rp${food.price.toLocaleString("id-ID")}` : "Rp25.000"}</p>
                    <Link
                      href={`/foods/${food.id}`}
                      className="mt-4 w-full inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300 text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="text-gray-400 text-6xl mb-4">🍕</div>
          <h3 className="text-xl font-medium text-gray-600">No foods found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your search query</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-center items-center mt-12 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-800 disabled:opacity-50 transition"
            aria-label="Previous page"
          >
            &lt;
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-full font-medium text-sm transition ${
                currentPage === i + 1 ? "bg-indigo-600 text-white shadow-md" : "bg-white hover:bg-indigo-50 text-gray-700 hover:text-indigo-600"
              }`}
              aria-label={`Go to page ${i + 1}`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-indigo-600 hover:bg-indigo-800 disabled:opacity-50 transition"
            aria-label="Next page"
          >
            &gt;
          </button>
        </motion.div>
      )}
    </div>
  );
}
