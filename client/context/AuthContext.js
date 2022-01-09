import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

//create context
const AuthContext = createContext();

//provider to wrap application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  //register user
  const register = async ({ username, email, password, sendPromotions }) => {
    //create new user object
    const user = { username, email, password, sendPromotions };
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error(res.status);
    } else {
      res.status(200);
    }
  };

  //login user
  const login = async ({ username, password }) => {
    console.log(username, password);
  };

  //logout user
  const logout = async () => {
    console.log("logout");
  };

  //check if user is logged in to persist
  const checkUserLoggedIn = async () => {
    console.log("check");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
