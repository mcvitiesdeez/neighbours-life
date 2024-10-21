import { createContext, useEffect, useState } from "react";
import { auth, signOut } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        return auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
        });
    }, []);

    const logOut = () => {
        signOut(auth);
    }

    const value = { currentUser, logOut }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}