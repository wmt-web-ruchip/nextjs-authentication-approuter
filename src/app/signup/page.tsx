"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: ""
  });
  const [loading, setLoading] = useState(false)
  const [buttonDisable, setButtonDisable] = useState(false)
  const router = useRouter();

  useEffect(() => {
    if (formData.email.length && formData.password.length && formData.username.length) {
      setButtonDisable(false)
    }
    else {
      setButtonDisable(true)
    }
  }, [formData])

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response:any = await axios.post("/api/users/signup", formData);
      if (response?.data?.success) {
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message)
      console.error("Signup failed:", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{loading ? "Processing" : "Signup"}</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {buttonDisable ? "No Signup" : "Sign Up"}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs mt-4">
          Already have an account? <Link href="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
        </p>
      </div>
    </div>
  );
}
