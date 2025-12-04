import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from '../../config/api';

function TeacherDetails() {
  const { id } = useParams();

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/teachers/${id}/`)
      .then((res) => {
        console.log("📡 Response status:", res.status);
        if (!res.ok) {
          throw new Error(`❌ Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ teachers data:", data);
        setTeacher(data);
      })
      .catch((err) => {
        console.error("Error fetching teachers:", err);
        // Mock data fallback
        const mockTeachers = {
          1: {
            id: 1,
            name: "Mr. Smith",
            subject: "Robotics",
            image: "${API_BASE_URL}/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post.png",
            experience: "8 years",
            bio: "Passionate about technology and inspiring the next generation of engineers.",
            education: "M.Sc. in Robotics, MIT"
          },
          2: {
            id: 2,
            name: "Ms. Johnson",
            subject: "Art",
            image: "${API_BASE_URL}/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post_1.png",
            experience: "5 years",
            bio: "Believes in the power of creativity to transform lives.",
            education: "B.F.A., Rhode Island School of Design"
          },
          3: {
            id: 3,
            name: "Mr. Lee",
            subject: "Coding",
            image: "${API_BASE_URL}/media/teachers/Blue_Gold_Modern_Graduation_Announcement_Instagram_Post_2.png",
            experience: "10 years",
            bio: "Expert in Python and JavaScript, with a focus on practical application.",
            education: "B.S. in Computer Science, Stanford University"
          }
        };
        if (mockTeachers[id]) {
          console.log("⚠️ Using mock data for teacher", id);
          setTeacher(mockTeachers[id]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 animate-pulse">Loading Teacher...</p>
      </div>
    );
  }

  if (!teacher) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Teacher not found.</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white dark:bg-gray-800 shadow rounded">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          {/* <img src={teacher?.image} /> */}
          <img
            src={teacher?.image}
            alt={`${teacher?.name} - ${teacher?.subject} teacher`}
            className="w-full h-auto object-cover rounded bg-[#eeeeee]"
          />
        </div>

        <div className="p-3 text-gray-900 dark:text-white">
          <h2 className="text-2xl font-bold mb-2 text-[#b04ba2] dark:text-[#d67bc9]">{teacher?.name}</h2>
          <p className="text-lg font-semibold mb-4 text-gray-600 dark:text-gray-300">{teacher?.subject}</p>

          <div className="space-y-3">
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-200">Experience:</span>
              <p className="text-gray-600 dark:text-gray-400">{teacher?.experience || "N/A"}</p>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-200">Education:</span>
              <p className="text-gray-600 dark:text-gray-400">{teacher?.education || "N/A"}</p>
            </div>
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-200">Bio:</span>
              <p className="text-gray-600 dark:text-gray-400">{teacher?.bio || "No biography available."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDetails;
