import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Teachers() {
  const [teachers, setteachers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/teachers/")
      .then((res) => {
        console.log("📡 Response status:", res.status);
        if (!res.ok) {
          throw new Error(`❌ Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ teachers data:", data);
        if (data.length === 0) {
          console.log("⚠️ No teachers found, using mock data");
          setteachers([
            {
              id: 1,
              name: "Mr. Smith",
              subject: "Robotics",
              image: "http://127.0.0.1:8000/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post.png",
            },
            {
              id: 2,
              name: "Ms. Johnson",
              subject: "Art",
              image: "http://127.0.0.1:8000/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post_1.png",
            },
            {
              id: 3,
              name: "Mr. Lee",
              subject: "Coding",
              image: "http://127.0.0.1:8000/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post_2.png",
            },
          ]);
        } else {
          setteachers(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching teachers:", err);
        setteachers([
          {
            id: 1,
            name: "Mr. Smith",
            subject: "Robotics",
            image: "http://127.0.0.1:8000/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post.png",
          },
          {
            id: 2,
            name: "Ms. Johnson",
            subject: "Art",
            image: "http://127.0.0.1:8000/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post_1.png",
          },
          {
            id: 3,
            name: "Mr. Lee",
            subject: "Coding",
            image: "http://127.0.0.1:8000/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post_2.png",
          },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-5 mt-16">
      <h3 className="my-5">Our teachers</h3>

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
          {teachers.slice(0, 3)?.map((teacher) => (
            <div
              onClick={() => navigate(`/teachers/${teacher.id}`)}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {/* <img
                className="w-full h-auto object-cover"
                src={teacher?.image}
              /> */}
              <img
                src={teacher?.image}
                alt=""
                className="w-full h-auto object-cover bg-[#eeeeee]"
              />

              <div className="p-4">
                <h2 className="text-[#b04ba2] font-bold text-[18px]">
                  {teacher?.name}
                </h2>

                <p className="text-gray-500 mb-2 truncate">
                  {teacher?.subject}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teachers;
