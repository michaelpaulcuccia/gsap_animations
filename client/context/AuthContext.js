import { createContext, useState } from "react";
import { useRouter } from "next/router";

//create context
const AuthContext = createContext();

//provider to wrap application
export const AuthProvider = ({ children }) => {

   //constants
   const [user, setUser] = useState(null);
   const [loggedIn, setLoggedIn] = useState(null);
   const router = useRouter();

  //register user
  const register = async ({ username, email, password, sendPromotions }) => {
    //create new user object
    const user = { username, email, password, sendPromotions };
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!res.ok) {
      throw new Error(res.status);
    }
  };

  //login user
  const login = async ({ username, password }) => {
    setUser(username);
    setLoggedIn(true);
    router.push('/home');
  };

  //logout user
  const logout = async () => {
    setLoggedIn(null)
  };

  return (
    <AuthContext.Provider value={{ user, loggedIn, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
