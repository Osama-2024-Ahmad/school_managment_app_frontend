import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import API_BASE_URL from '../config/api';

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth()

  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",

  })

  const [message, setMessage] = useState("");


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_BASE_URL}/users/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      })

      const data = await res.json();

      if (!res.ok) {

        if (data.username) {
          throw new Error(`❌ ${data.username[0]}`);
        }

        if (data.email) {
          throw new Error(`❌ ${data.email[0]}`);
        }
        throw new Error("❌ Registration failed");
      }

      login(data.token);
      fetch(`${API_BASE_URL}/profiles/`, {
        headers: {
          "Authorization": `Token ${data.token}`,
        },
      })
        .then((res) => res.json())
        .then((profileData) => {
          if (Array.isArray(profileData) && profileData.length > 0) {
            login(data.token, profileData[0].role);
          }
        })



      setMessage("✅ Account created successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* form */}

      <div className='flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8'>

        <div className='w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>

          <h3 className=" mb-6 text-center text-[#b04ba2] dark:text-[#d67bc9] font-bold text-2xl">
            Create Account
          </h3>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="border p-3 rounded focus:ring focus:ring-blue-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 outline-none"
              required
            />


            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={form.first_name}
              onChange={handleChange}
              className="border p-3 rounded focus:ring focus:ring-blue-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 outline-none"
              required

            />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={form.last_name}
              onChange={handleChange}
              className="border p-3 rounded focus:ring focus:ring-blue-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="border p-3 rounded focus:ring focus:ring-blue-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 outline-none"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border p-3 rounded focus:ring focus:ring-blue-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 outline-none"
              required
            />

            <button
              type="submit"
              className="text-white py-3 rounded-lg bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A] hover:opacity-90 transition font-bold"
            >
              Register
            </button>

          </form>

          {message && (
            <p className='mt-4 text-center text-gray-700'>{message}</p>
          )}

        </div>

      </div>

      <div className='flex-1 hidden md:flex'>

        <img className='w-full h-full object-cover' src='/welcome.png' />
      </div>


    </div>
  )
}

export default Register