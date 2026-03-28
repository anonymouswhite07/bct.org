import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { signIn, signOut } from "../lib/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial session check
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAuthenticated(!!session);
            setLoading(false);
        });

        // Live auth state listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const login = async (email, password) => {
        const { error } = await signIn(email, password);
        if (error) {
            console.error("Auth Error:", error.message);
            return false;
        }
        return true;
    };

    const logout = async () => {
        await signOut();
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
