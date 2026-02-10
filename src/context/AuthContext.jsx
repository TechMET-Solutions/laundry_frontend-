import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load auth from localStorage on app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }


    // Check if the value exists and is NOT the string "undefined" or "null"
    if (storedUser && storedUser !== "undefined" && storedUser !== "null" && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          setUser(parsedUser);
          setToken(storedToken);
        }
      } catch (error) {
        console.error("Failed to parse user:", error);
        logout(); // Clean up if data is corrupted
      }
    } else {
      // If data is "undefined" string, clear it immediately
      if (storedUser === "undefined") {
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  // Login function - Add a safety check here
  // const login = (userData, authToken) => {
  //   if (!userData || !authToken) {
  //     console.error("Login failed: User data or Token is missing");
  //     return;
  //   }

  //   localStorage.setItem("user", JSON.stringify(userData));
  //   localStorage.setItem("token", authToken);

  //   setUser(userData);
  //   setToken(authToken);
  // };

  const login = (userData, authToken) => {
    if (!userData || !authToken) return;

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);

    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;

    setUser(userData);
    setToken(authToken);
  };


  // Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
