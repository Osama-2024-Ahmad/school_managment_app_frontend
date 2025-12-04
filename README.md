# 🎓 Nova School Management System - Frontend

A modern, responsive, and interactive frontend for the Nova School Management System, built with **React** and **Tailwind CSS**. This application provides a seamless user experience for students, teachers, and administrators to interact with the school's digital ecosystem.

## 🚀 Live Demo

**Visit the live application:** [https://school-managment-app-frontend.vercel.app/](https://school-managment-app-frontend.vercel.app/)

## 🛠️ Technologies Used

-   **Framework:** [React.js](https://reactjs.org/) (v18)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
-   **Routing:** [React Router](https://reactrouter.com/) - For seamless client-side navigation.
-   **State Management:** React Context API - For managing global authentication state.
-   **Icons:** Heroicons / SVG Icons.
-   **Deployment:** [Vercel](https://vercel.com/)

## ✨ Key Features

-   **Responsive Design:** Fully optimized for desktops, tablets, and mobile devices.
-   **User Authentication:** Secure Login and Registration pages with JWT integration.
-   **Dynamic Content:**
    -   **Teachers Directory:** Browse teacher profiles and specialties.
    -   **Academic Programs:** View detailed course information and curriculum.
    -   **Events Calendar:** Stay updated with school activities and schedules.
-   **Interactive Dashboard:** Personalized views for students (e.g., viewing grades).
-   **Testimonials:** Read success stories from students and parents.
-   **Modern UI/UX:** Glassmorphism effects, smooth transitions, and a vibrant color palette.

## 📂 Project Structure

```bash
src/
├── auth/           # Authentication context and logic
├── components/     # Reusable UI components (Navbar, Hero, Cards)
├── config/         # Configuration files (API base URL)
├── pages/          # Main application pages (Home, Login, Details)
│   └── details/    # Detailed views for specific items
├── App.js          # Main application component and routing
└── index.css       # Global styles and Tailwind directives
```

## 🔧 Installation & Setup

To run this project locally:

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Osama-2024-Ahmad/school_managment_app_frontend.git
    cd school_managment_app_frontend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    The application is pre-configured to connect to the production backend. To use a local backend, update `src/config/api.js`.

4.  **Start the Development Server**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 🤝 Backend

This frontend connects to a powerful Django backend.
**Backend Repository:** [Link to Backend Repo](https://github.com/Osama-2024-Ahmad/school_managment_app_backend)
**Live API:** [https://school-managment-app-backend.onrender.com](https://school-managment-app-backend.onrender.com)


