/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const register = useCallback((name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || '[]');
    if (users.find((u) => u.email === email)) {
      return { success: false, message: "Email is already in use" };
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      createAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return { success: true };
  }, []);

  const login = useCallback((email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || '[]');
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );
    if (!user) {
      return { success: false, message: "Invalid Email Or Password" };
    }
    const safeUser = { id: user.id, name: user.name, email: user.email, createAt: user.createAt };
    setCurrentUser(safeUser);
    localStorage.setItem("currentUser", JSON.stringify(safeUser));
    return { success: true };
  }, []);
    
    const logout = useCallback(() => {
        setCurrentUser(null);
        localStorage.removeItem('currentUser');
    }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
