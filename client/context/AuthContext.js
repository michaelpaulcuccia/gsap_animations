import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

//create context
const AuthContext = createContext();

//provider to wrap application
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const router = useRouter();

    //register user
    const register = async ({username, email, password, sendPromotions}) => {
        console.log(`AUTH CONTEXT: ${username}`);
        console.log(`AUTH CONTEXT: ${email}`);
        console.log(`AUTH CONTEXT: ${password}`);
        console.log(`AUTH CONTEXT: ${sendPromotions}`);
    };

    //login user
    const login = async ({ email, password }) => {
        console.log(email, password);
    };

    //logout user
    const logout = async () => {
        console.log('logout');
    };

    //check if user is logged in to persist
    const checkUserLoggedIn = async () => {
        console.log('check');
    };

    return(
        <AuthContext.Provider value={{user, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext