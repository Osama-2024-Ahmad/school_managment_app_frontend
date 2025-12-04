import { createContext, useContext, useEffect, useState } from "react";
import API_BASE_URL from '../config/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem("token"))

    const [role, setRole] = useState(localStorage.getItem("role"))


    useEffect(() => {
        if (token) {
            fetch(`${API_BASE_URL}/profiles/`, {
                headers: { Authorization: `Token ${token}` }
            })

                .then((res) => res.json())
                .then((data) => {
                    if (Array.isArray(data) && data.length > 0) {
                        setRole(data[0].role);
                        localStorage.setItem("role", data[0].role);
                    }
                })

                .catch((err) => console.error("Error fetching profile:", err));

        }
    }, [token])


    const login = (token, role) => {
        setToken(token)
        setRole(role)
        localStorage.setItem("token", token)
        if (role) localStorage.setItem("role", role);

    }

    const logout = () => {
        setToken(null)
        setRole(null)
        localStorage.removeItem("token")
        localStorage.removeItem("role")

    }

    return (
        <AuthContext.Provider value={{ token, role, login, logout }}>{children}</AuthContext.Provider>
    )

}


export function useAuth() {
    return useContext(AuthContext);
}
