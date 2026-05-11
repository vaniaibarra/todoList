import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, editProfileRequest  } from "../api/auth";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth debe estar dentro de un AuthProvider");
    }
    return context;
};

export const AuthProvider = ({children}) => {
    const [ user, setUser ] = useState(null);
    const [ isAuthenticated, setIsAuthenticated ] = useState(false);
    const [ errors, setErrors ] = useState([]);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if(errors.length > 0){
            const timer = setTimeout(() => setErrors([]), 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    useEffect(() => {
        async function checkLogin(){
            const token = localStorage.getItem("token");
            if(!token){
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(token);
                if(!res.data){
                    setIsAuthenticated(false);
                    setLoading(false);
                    return;
                }
                const savedUser = localStorage.getItem("user");
                setUser(res.data.name ? res.data : savedUser ? JSON.parse(savedUser) : res.data);
                setIsAuthenticated(true);
                setLoading(false);
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setLoading(false);
            }
        }
        checkLogin();
    }, []);

    const signup = async (values) => {
        try {
            const res = await registerRequest(values);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
            localStorage.setItem("token", res.data.token);
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.response?.data || ["Error de conexión"];
            setErrors(Array.isArray(errorMsg) ? errorMsg : [errorMsg]);
        }
    };

    const signin = async (values) => {
        try {
            const res = await loginRequest(values);
            console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
        } catch (error) {
            const errorMsg = error.response?.data?.message || error.response?.data || ["Error al iniciar sesión"];
            setErrors(Array.isArray(errorMsg) ? errorMsg : [errorMsg]);
        }
    };

    

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
    };
    return (
        <AuthContext.Provider
        value={{
            signup, signin, logout, user, setUser, isAuthenticated, errors, loading
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}