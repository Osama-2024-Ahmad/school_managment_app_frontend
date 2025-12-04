import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../config/api';
function Programs() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/programs/")
      .then((res) => {
        console.log("📡 Response status:", res.status);
        if (!res.ok) {
          throw new Error(`❌ Server error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Programs data:", data);
        if (data.length === 0) {
          console.log("⚠️ No programs found, using mock data");
          setPrograms([
            {
              id: 1,
              title: "Robotics for Kids",
              description: "Learn to build and program robots.",
              image: "/media/programs/robotics_for_kids.png",
              teacher: { name: "Mr. Smith" },
              price: "$100",
              lessons: 10,
              hours: 20,
            },
            {
              id: 2,
              title: "Art & Creativity",
              description: "Unleash your creativity with painting and drawing.",
              image: "/media/programs/art_and_creativity.png",
              teacher: { name: "Ms. Johnson" },
              price: "$80",
              lessons: 8,
              hours: 16,
            },
            {
              id: 3,
              title: "Coding Basics",
              description: "Introduction to programming with Python.",
              image: "/media/programs/coding_basics_flyer.png",
              teacher: { name: "Mr. Lee" },
              price: "$120",
              lessons: 12,
              hours: 24,
            },
          ]);
        } else {
          setPrograms(data);
        }
      })
      .catch((err) => {
        console.error("Error fetching programs:", err);
        setPrograms([
          {
            id: 1,
            title: "Robotics for Kids",
            description: "Learn to build and program robots.",
            image: "/media/programs/robotics_for_kids.png",
            teacher: { name: "Mr. Smith" },
            price: "$100",
            lessons: 10,
            hours: 20,
          },
          {
            id: 2,
            title: "Art & Creativity",
            description: "Unleash your creativity with painting and drawing.",
            image: "/media/programs/art_and_creativity.png",
            teacher: { name: "Ms. Johnson" },
            price: "$80",
            lessons: 8,
            hours: 16,
          },
          {
            id: 3,
            title: "Coding Basics",
            description: "Introduction to programming with Python.",
            image: "/media/programs/coding_basics_flyer.png",
            teacher: { name: "Mr. Lee" },
            price: "$120",
            lessons: 12,
            hours: 24,
          },
        ]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-5 mt-16">
      <h3 className="my-5">Our Programs</h3>

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
          {programs.slice(0, 3)?.map((program) => (
            <div
              onClick={() => navigate(`/programs/${program.id}`)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              {/* <img className="w-full h-48 object-cover" src={program?.image} /> */}
              <img
                className="w-full h-48 object-cover"
                src={program?.image}
                alt={`${program?.title} - Program by ${program?.teacher?.name}`}
                onError={(e) => {
                  e.target.src = "/default-program.jpg";
                }}
              />

              <div className="p-4">
                <h2 className="text-[#b04ba2] dark:text-[#d67bc9] font-bold text-[18px]">
                  {program?.title}
                </h2>

                <p className="mt-2 dark:text-gray-300">Teacher: {program?.teacher?.name}</p>

                <p className="text-gray-500 dark:text-gray-400 mb-2">{program?.description}</p>
                <div className="flex items-center justify-between">
                  <strong className=" text-[#b04ba2] dark:text-[#d67bc9] font-bold ">
                    Price: {program?.price}
                  </strong>

                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    Lessons: {program.lessons} | Hours: {program.hours}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Programs;
