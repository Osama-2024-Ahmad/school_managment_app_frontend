import React, { useState } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Star } from 'lucide-react';

function Testimonial() {

  const { token } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    comment: "",
    rating: 5,
    name: "",
    email: ""

  })

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!token) {
      setMessage("❌ You must be logged in to add a testimonial")
      return
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/testimonials/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },

        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error("❌ Failed to submit testimonial");
      }

      setMessage(" Testimonial submitted successfully!")

      setForm({
        comment: "",
        rating: 5
      })

      setTimeout(() => {
        navigate("/");
      }, 2000);




    } catch (error) {
      setMessage(error.message);

    }

  }


  const handleRatingChange = (val) => {
    setForm({ ...form, rating: val })
  }
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* form */}

      <div className='flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8'>

        <div className='w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>

          <h3 className=" mb-6 text-center text-[#b04ba2] dark:text-[#d67bc9] font-bold text-2xl">
            Leave a Review
          </h3>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>


            <input
              type="name"
              name="name"
              placeholder="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border p-3 rounded focus:ring focus:ring-blue-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 outline-none"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border p-3 rounded focus:ring focus:ring-blue-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 outline-none"
              required
            />

            <textarea type="text"
              name="comment"
              placeholder="comment"
              value={form.comment}
              onChange={(e) => setForm({ ...form, comment: e.target.value })}
              className="border p-3 rounded focus:ring focus:ring-blue-300 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 outline-none"
              required>
            </textarea>


            <div className='flex gap-2 text-2xl'>

              {[1, 2, 3, 4, 5].map((val) => (
                val <= form.rating ? (
                  <Star key={val} className="w-7 h-7 text-yellow-400 cursor-pointer transition" onClick={() => handleRatingChange(val)}
                  />
                ) : (
                  <Star
                    key={val}
                    onClick={() => handleRatingChange(val)}
                    className={`w-7 h-7 cursor-pointer transition ${val <= form.rating ? "text-yellow-400" : "text-gray-300"}`}
                  />
                )
              ))}
            </div>

            <button
              type="submit"
              className="text-white py-3 rounded-lg bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A] hover:opacity-90 transition font-bold"
            >
              Send
            </button>

          </form>

          {message && (
            <p className='mt-4 text-center text-gray-700'>{message}</p>
          )}

        </div>

      </div>

      <div className='flex-1 hidden md:flex'>

        <img className='w-full h-full object-cover' src='/testimonial.png' />
      </div>


    </div>
  )
}

export default Testimonial