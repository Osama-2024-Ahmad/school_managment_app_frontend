import { BookOpen, Clock, DollarSign, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import API_BASE_URL from '../config/api';

function ProgramDetails() {

  const [newComment, setNewComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const { token } = useAuth()

  const [message, setMessage] = useState("");

  const { id } = useParams()

  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    fetch(`${API_BASE_URL}/programs/${id}/`)
      .then((res) => {
        console.log("📡 Response status:", res.status);
        if (!res.ok) {
          throw new Error(`❌ Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ programs data:", data);
        setProgram(data)
      })
      .catch((err) => {
        console.error("Error fetching programs:", err);
        // Mock data fallback
        const mockPrograms = {
          1: {
            id: 1,
            title: "Robotics for Kids",
            description: "Learn to build and program robots.",
            image: "${API_BASE_URL}/media/programs/robotics_for_kids.png",
            teacher: { name: "Mr. Smith", subject: "Robotics", image: "${API_BASE_URL}/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post.png" },
            price: "100",
            lessons: 10,
            hours: 20,
            seats: 15,
            reviews: []
          },
          2: {
            id: 2,
            title: "Art & Creativity",
            description: "Unleash your creativity with painting and drawing.",
            image: "${API_BASE_URL}/media/programs/art_and_creativity.png",
            teacher: { name: "Ms. Johnson", subject: "Art", image: "${API_BASE_URL}/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post_1.png" },
            price: "80",
            lessons: 8,
            hours: 16,
            seats: 20,
            reviews: []
          },
          3: {
            id: 3,
            title: "Coding Basics",
            description: "Introduction to programming with Python.",
            image: "${API_BASE_URL}/media/programs/coding_basics_flyer.png",
            teacher: { name: "Mr. Lee", subject: "Coding", image: "${API_BASE_URL}/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post_2.png" },
            price: "120",
            lessons: 12,
            hours: 24,
            seats: 12,
            reviews: []
          }
        };
        if (mockPrograms[id]) {
          console.log("⚠️ Using mock data for program", id);
          setProgram(mockPrograms[id]);
        }
      }).finally(() => {
        setLoading(false)
      })
  }, [id])


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 animate-pulse">Loading program...</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Program not found.</p>
      </div>
    );
  }
  const handleAddReview = async (e) => {

    e.preventDefault()
    if (!token) {
      setMessage("❌ You must be logged in to add a Review")
      return
    }
    try {

      setSubmitting(true)
      const res = await fetch("${API_BASE_URL}/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          program: program.id,
          comment: newComment,
          name: name,
          email: email
        })


      })

      if (!res.ok) {
        throw new Error("❌ Failed to add review");
      }

      const data = await res.json()

      setProgram((prev) => ({
        ...prev,
        reviews: [data, ...(prev.reviews || [])],
      }))

      setMessage("Your Reviews Successfully added")

      setNewComment("");
      setName("")
      setEmail("")

    } catch (error) {
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className='max-w-5xl mx-auto p-6 mt-10'>

      <div className='bg-white shadow-lg rounded-xl overflow-hidden'>

      </div>
      <img src={program.image} className='w-full h-72 object-cover' />

      {/* Content */}


      <div className='p-6 space-y-4'>
        <h1 className="text-3xl font-bold text-[#b04ba2] dark:text-[#d67bc9]">{program.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{program.description}</p>
      </div>


      {/* Info cards */}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
        <div className='flex items-center gap-3 p-4 bg-violet-50 dark:bg-gray-800 rounded-lg'>

          <DollarSign />
          <div>

            <p className="text-sm text-gray-500 dark:text-gray-400">Price</p>
            <p className="font-semibold dark:text-white">${program.price}</p>
          </div>

        </div>



        <div className='flex items-center gap-3 p-4 bg-violet-50 dark:bg-gray-800 rounded-lg'>

          <User />
          <div>

            <p className="text-sm text-gray-500 dark:text-gray-400">Seats</p>
            <p className="font-semibold dark:text-white">{program.seats}</p>
          </div>

        </div>



        <div className='flex items-center gap-3 p-4 bg-violet-50 dark:bg-gray-800 rounded-lg'>

          <BookOpen />
          <div>

            <p className="text-sm text-gray-500 dark:text-gray-400">Lessons</p>
            <p className="font-semibold dark:text-white">{program.lessons}</p>
          </div>

        </div>



        <div className='flex items-center gap-3 p-4 bg-violet-50 dark:bg-gray-800 rounded-lg'>

          <Clock />
          <div>

            <p className="text-sm text-gray-500 dark:text-gray-400">Hours</p>
            <p className="font-semibold dark:text-white">{program.hours}</p>
          </div>

        </div>



      </div>


      {/* Teacher */}


      {program?.teacher && (
        <div className='mt-8 p-4 border dark:border-gray-700 rounded-lg flex items-center gap-4'>

          {program?.teacher?.image && (
            <img className='w-44 h-44 object-cover rounded-full border dark:border-gray-600 bg-[#eeeeee]' src={program.teacher.image} />


          )}

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Teacher</p>
            <p className="font-semibold dark:text-white">{program.teacher.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{program.teacher.subject}</p>
          </div>


        </div>
      )}


      {/* all Reviews */}


      <div className='mt-10'>
        <h3 className='mb-5'>Reviews</h3>

        {program?.reviews && program.reviews.length > 0 ? (

          <div className='space-y-4 mb-6'>

            {program.reviews.map((review) => (
              <div className='p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800'>


                <p className='text-gray-700 dark:text-gray-300'>{review?.comment}</p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  {review?.user?.name}
                </p>
                <p className='text-xs text-gray-400'>
                  {new Date(review?.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-6">No reviews yet.</p>
        )}
      </div>

      {/* Form Review */}

      <div className='mt-10'>
        <h3 className='mb-5'>Leave a Review</h3>
        <form onSubmit={handleAddReview} className="flex flex-col gap-3">

          <input
            type="name"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded focus:ring focus:ring-blue-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            required
          />

          <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder='add your comment' className="border p-3 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            rows="3">


          </textarea>

          <button disabled={submitting} type='submit'>{submitting ? "submitting" : "add comment"}</button>

        </form>
      </div>
      {message && (
        <p className='mt-4 text-center text-gray-700'>{message}</p>
      )}


    </div>
  )
}

export default ProgramDetails