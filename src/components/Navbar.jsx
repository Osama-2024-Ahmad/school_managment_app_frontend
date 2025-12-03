import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext';

function Navbar() {

  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()

  const { role, logout } = useAuth()




  return (
    <div className="text-sm text-white w-full">
      <div className="text-center font-medium py-2 bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
        <p>New Academic Year Admissions Now Open – <span className="underline underline-offset-2">Apply Today !</span></p>
      </div>
      <nav className="relative flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all shadow">
        <a href="/" className="flex items-center gap-2">
          <img className='h-28 w-auto' src='/logo.png' alt="Nova School" />
          <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-[#9938CA] to-[#E0724A]">
            Nova School
          </span>
        </a>
        <ul className="hidden md:flex items-center space-x-8 md:pl-28">
          <li><a href="/">Home</a></li>
          <li><a href="/teachers"> Teachers</a></li>
          <li><a href="/Programs"> Programs</a></li>
          <li><a href="/events"> Events</a></li>
          <li><a href="/testimonial">  Testimonials</a></li>
        </ul>




        <div className='flex items-center gap-4'>


          {!role ? (
            <>
              <button onClick={() => navigate("/login")} className="hidden md:block text-[#C45B7D] dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 px-9 py-2 rounded-full active:scale-95 transition-all">Login</button>

              <button onClick={() => navigate("/register")} className="hidden md:block text-[#C45B7D] dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600 px-9 py-2 rounded-full active:scale-95 transition-all">Register</button>
            </>
          ) : (
            <>
              {role === "student" && (
                <button
                  onClick={() => navigate("/grades")}
                  className="hidden md:block text-[#C45B7D] bg-white hover:bg-gray-50 border border-gray-300 px-9 py-2 rounded-full active:scale-95 transition-all"
                >
                  My Grades
                </button>
              )}

              <button
                onClick={logout}
                className="hidden md:block text-[#C45B7D] bg-white hover:bg-gray-50 border border-gray-300 px-9 py-2 rounded-full active:scale-95 transition-all"
              >
                Logout
              </button>
            </>
          )}

        </div>
        <button onClick={() => setIsOpen(!isOpen)} aria-label="menu-btn" type="button" className="menu-btn inline-block md:hidden active:scale-90 transition">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" className="dark:fill-white">
            <path d="M3 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2zm0 7a1 1 0 1 0 0 2h24a1 1 0 1 0 0-2z" />
          </svg>
        </button>

        {isOpen && (
          <div className="mobile-menu absolute top-[70px] left-0 w-full bg-white dark:bg-gray-900 shadow-sm p-6 md:hidden">
            <ul className="flex flex-col space-y-4 text-lg text-gray-900 dark:text-white">
              <li><a href="/" className="text-sm">Home</a></li>
              <li><a href="/teachers" className="text-sm">Teachers</a></li>
              <li><a href="/programs" className="text-sm">Programs</a></li>
              <li><a href="/events" className="text-sm">Events</a></li>
              <li><a href="/testimonial" className="text-sm">Testimonials</a></li>
            </ul>


          </div>
        )}

      </nav>
    </div>


  )
}

export default Navbar