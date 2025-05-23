"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import Link from "next/link";

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
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormValid = form.name && form.email && form.password && form.passwordRepeat && form.role && form.phoneNumber && form.password === form.passwordRepeat;

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

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
        setShowSuccess(true);
        // Auto redirect after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setErrorMessage(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 relative">
      {/* Success Notification */}
      {showSuccess && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 shadow-sm flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <h3 className="text-sm font-medium text-green-800">Registration Successful!</h3>
              <p className="text-sm text-green-600 mt-1">You will be redirected to login page shortly.</p>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-500">Fill in your details to get started</p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-600 flex items-start gap-3">
            <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Form fields remain the same as before */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-black placeholder:text-gray-400 focus:border-indigo-500 outline-none transition"
              placeholder="Input your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 text-black focus:border-indigo-500 outline-none transition"
              placeholder="Input your email address"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-black placeholder:text-gray-400 focus:border-indigo-500 outline-none transition"
              placeholder="Input your phone number"
              value={form.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 text-black placeholder:text-gray-400 focus:border-indigo-500 outline-none transition pr-10"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="passwordRepeat" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="passwordRepeat"
                name="passwordRepeat"
                type={showRepeatPassword ? "text" : "password"}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500  text-black placeholder:text-gray-400 focus:border-indigo-500 outline-none transition pr-10"
                placeholder="••••••••"
                value={form.passwordRepeat}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              >
                {showRepeatPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${
              !isFormValid || loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-sm"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
