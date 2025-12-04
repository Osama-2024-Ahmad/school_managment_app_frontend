import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../config/api';

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("/events/")
      .then((res) => {
        console.log("📡 Response status:", res.status);
        if (!res.ok) {
          throw new Error(`❌ Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ events data:", data);
        if (data.length === 0) {
          console.log("⚠️ No events found, using mock data");
          setEvents([
            {
              id: 1,
              title: "Science Fair",
              description: "Showcasing student science projects.",
              image: "/media/events/Green_and_Yellow_Exciting_School_Admission_Instagram_Post.png",
              location: "School Hall",
              time_from: "10:00 AM",
              time_to: "2:00 PM",
            },
            {
              id: 2,
              title: "Sports Day",
              description: "Annual sports competition.",
              image: "/media/events/Blue_and_White_Dynamic_International_Olympic_Day_Instagram_Post.png",
              location: "Sports Field",
              time_from: "9:00 AM",
              time_to: "3:00 PM",
            },
            {
              id: 3,
              title: "Art Exhibition",
              description: "Displaying student artwork.",
              image: "/media/events/Yellow_and_White_Minimalist_Geometric_Memphis_Art_Exhibition_Poster.png",
              location: "Art Room",
              time_from: "11:00 AM",
              time_to: "4:00 PM",
            },
          ]);
        } else {
          setEvents(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setEvents([
          {
            id: 1,
            title: "Science Fair",
            description: "Showcasing student science projects.",
            image: "/media/events/Green_and_Yellow_Exciting_School_Admission_Instagram_Post.png",
            location: "School Hall",
            time_from: "10:00 AM",
            time_to: "2:00 PM",
          },
          {
            id: 2,
            title: "Sports Day",
            description: "Annual sports competition.",
            image: "/media/events/Blue_and_White_Dynamic_International_Olympic_Day_Instagram_Post.png",
            location: "Sports Field",
            time_from: "9:00 AM",
            time_to: "3:00 PM",
          },
          {
            id: 3,
            title: "Art Exhibition",
            description: "Displaying student artwork.",
            image: "/media/events/Yellow_and_White_Minimalist_Geometric_Memphis_Art_Exhibition_Poster.png",
            location: "Art Room",
            time_from: "11:00 AM",
            time_to: "4:00 PM",
          },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-5 mt-16">
      <h3 className="my-5">Our Events</h3>

      {/*  Skeleton */}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div className="animate-pulse bg-white rounded-lg shadow-md overflow-hidden">
              <div className="w-full h-48 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.slice(0, 3)?.map((event) => (
            <div
              onClick={() => navigate(`/events/${event.id}`)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {/* <img className="w-full h-48 object-cover" src={event?.image} /> */}
              <img
                className="w-full h-48 object-cover"
                src={event?.image}
                alt={`${event?.title} - Event at ${event?.location}`}
                onError={(e) => {
                  e.target.src = "/default-event.jpg";
                }}
              />

              <div className="p-4">
                <h2 className="text-[#b04ba2] dark:text-[#d67bc9] font-bold text-[18px]">
                  {event?.title}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mb-2 truncate">
                  {event?.description}
                </p>
                <div className="flex items-center justify-between">
                  <strong className=" text-[#b04ba2] dark:text-[#d67bc9] flex items-center gap-3 font-bold ">
                    <Clock /> {event?.time_from} - {event.time_to}
                  </strong>
                </div>

                <p className=" gap-3 flex items-center text-[#b04ba2] dark:text-[#d67bc9] mt-3 text-sm">
                  <MapPin /> {event.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
