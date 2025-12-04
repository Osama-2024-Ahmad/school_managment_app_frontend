import { BookOpen, Calendar, Clock, DollarSign, MapPin, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API_BASE_URL from '../../config/api';

function EventDetails() {


  const { id } = useParams()

  const [event, setevent] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetch(`${API_BASE_URL}/events/${id}/`)
      .then((res) => {
        console.log("📡 Response status:", res.status);
        if (!res.ok) {
          throw new Error(`❌ Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ events data:", data);
        setevent(data)
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        // Mock data fallback
        const mockEvents = {
          1: {
            id: 1,
            title: "Science Fair",
            description: "Showcasing student science projects.",
            image: "/media/events/Green_and_Yellow_Exciting_School_Admission_Instagram_Post.png",
            location: "School Hall",
            time_from: "10:00 AM",
            time_to: "2:00 PM",
            date: "2023-11-15",
            teacher: { name: "Mr. Smith", subject: "Science", image: "/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post.png" }
          },
          2: {
            id: 2,
            title: "Sports Day",
            description: "Annual sports competition.",
            image: "/media/events/Blue_and_White_Dynamic_International_Olympic_Day_Instagram_Post.png",
            location: "Sports Field",
            time_from: "9:00 AM",
            time_to: "3:00 PM",
            date: "2023-12-10",
            teacher: { name: "Ms. Johnson", subject: "PE", image: "/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post_1.png" }
          },
          3: {
            id: 3,
            title: "Art Exhibition",
            description: "Displaying student artwork.",
            image: "/media/events/Yellow_and_White_Minimalist_Geometric_Memphis_Art_Exhibition_Poster.png",
            location: "Art Room",
            time_from: "11:00 AM",
            time_to: "4:00 PM",
            date: "2024-01-20",
            teacher: { name: "Mr. Lee", subject: "Art", image: "/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post_2.png" }
          }
        };
        if (mockEvents[id]) {
          console.log("⚠️ Using mock data for event", id);
          setevent(mockEvents[id]);
        }
      }).finally(() => {
        setLoading(false)
      })
  }, [id])


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 animate-pulse">Loading event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Event not found.</p>
      </div>
    );
  }
  return (
    <div className='max-w-5xl mx-auto p-6 mt-10'>

      <div className='bg-white shadow-lg rounded-xl overflow-hidden'>

      </div>
      <img src={event.image} className='w-full h-72 object-cover' />

      {/* Content */}


      <div className='p-6 space-y-4'>
        <h1 className="text-3xl font-bold text-[#b04ba2] dark:text-[#d67bc9]">{event.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{event.description}</p>
      </div>


      {/* Info cards */}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6'>
        <div className='flex items-center gap-3 p-4 bg-violet-50 dark:bg-gray-800 rounded-lg'>

          <Calendar />
          <div>

            <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
            <p className="font-semibold dark:text-white">${event.date}</p>
          </div>

        </div>



        <div className='flex items-center gap-3 p-4 bg-violet-50 dark:bg-gray-800 rounded-lg'>

          <Clock />
          <div>

            <p className="text-sm text-gray-500 dark:text-gray-400">Time</p>
            <p className="font-semibold dark:text-white"> {event.time_from} - {event.time_to}</p>
          </div>

        </div>



        <div className='flex items-center gap-3 p-4 bg-violet-50 dark:bg-gray-800 rounded-lg'>

          <MapPin />
          <div>

            <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
            <p className="font-semibold dark:text-white">{event.location}</p>
          </div>

        </div>






      </div>


      {/* Teacher */}


      {event?.teacher && (
        <div className='mt-8 p-4 border dark:border-gray-700 rounded-lg flex items-center gap-4'>

          {event?.teacher?.image && (
            <img className='w-44 h-44 object-cover rounded-full border dark:border-gray-600 bg-[#eeeeee]' src={event.teacher.image} />


          )}

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Teacher</p>
            <p className="font-semibold dark:text-white">{event.teacher.name}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">{event.teacher.subject}</p>
          </div>


        </div>
      )}



    </div>
  )
}

export default EventDetails