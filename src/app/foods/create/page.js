"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateFoodPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    imageUrl: "",
    ingredients: "",
    price: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
    if (successMessage) setSuccessMessage("");
  };

  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.imageUrl || !form.ingredients || !form.price) {
      setError("Please fill in all fields");
      return;
    }

    const formattedData = {
      ...form,
      ingredients: form.ingredients.split(",").map((item) => item.trim()),
      price: Number(form.price),
    };

    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://api-bootcamp.do.dibimbing.id/api/v1/create-food", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiKey: "w05KkI9AWhKxzvPFtXotUva-",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.errors?.[0]?.message || "Failed to create food item");
      }

      // ✅ Show success and redirect after delay
      setSuccessMessage("Food item successfully created!");
      setTimeout(() => {
        router.push("/foods");
      }, 2000);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Add New Food</h1>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm transition-opacity duration-500 ease-in-out">{successMessage}</div>
        )}

        <div className="space-y-4">
          <InputField id="name" label="Food Name" value={form.name} onChange={handleChange} placeholder="e.g. Spaghetti Carbonara" />
          <InputField id="description" label="Description" value={form.description} onChange={handleChange} placeholder="Short description of the food" />
          <InputField id="imageUrl" label="Image URL" value={form.imageUrl} onChange={handleChange} placeholder="https://example.com/image.jpg" />
          <TextAreaField
            id="ingredients"
            label="Ingredients (comma separated)"
            value={form.ingredients}
            onChange={handleChange}
            placeholder="e.g. pasta, eggs, bacon, cheese"
          />
          <InputField id="price" label="Price" type="number" value={form.price} onChange={handleChange} placeholder="e.g. 25000" />

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isSubmitting ? "bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            } transition-colors`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
}

function InputField({ id, label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        className="w-full px-4 py-2 border placeholder:text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
      />
    </div>
  );
}

function TextAreaField({ id, label, value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="3"
        className="w-full px-4 py-2 border placeholder:text-gray-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
      />
    </div>
  );
}
