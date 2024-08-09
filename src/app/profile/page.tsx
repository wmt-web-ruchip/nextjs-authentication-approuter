"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

function Profile() {
  const router = useRouter();
  const [user, setUser] = useState()

  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      // Redirect to the login page or homepage after successful logout
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const getUserDetail = async () => {
    try {
      const userData = await axios.get('/api/users/me');
      router.push(`/profile/${userData?.data?.user?._id}`)
    } catch (error) {
      console.error('Get User Me failed:', error);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Logout
      </button>
      <button onClick={getUserDetail}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        User detail
      </button>
    </div>
  );
}

export default Profile;
