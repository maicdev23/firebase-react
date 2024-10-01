import { createContext, useContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

import { auth } from "../config/firebase";

import Cookies from "js-cookie";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) console.log("No auth context")

    return context
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const usuario = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        }); return () => usuario()
    }, [])

    const register = async (email, password) => {
        const response = await createUserWithEmailAndPassword(auth, email, password)
        alert(`User registered as ${response.user.email}`)
    }

    const login = async (email, password) => {
        const response = await signInWithEmailAndPassword(auth, email, password)

        const token = await response.user.getIdToken()
        Cookies.set('token', token)

        setUser(response.user);
    }

    const loginWithGoogle = async () => {
        const responseGoogle = new GoogleAuthProvider()
        const { user } = await signInWithPopup(auth, responseGoogle)

        const token = await user.getIdToken()
        Cookies.set('token', token)

        setUser(user)
    }

    const logout = async () => {
        await signOut(auth)
        Cookies.remove('token')
        setUser(null)
    }

    return <AuthContext.Provider
        value={{
            register, login, loginWithGoogle, logout, user
        }}
    >
        {children}
    </AuthContext.Provider>
}