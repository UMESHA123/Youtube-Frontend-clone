import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, logoutUser, registerUser } from "../api";
import Loader from "../components/Loader";
import { LocalStorage, requestHandler } from "../utils";

const AuthContext = createContext({
    user: null,
    token: null,
    login: async () => {},
    register: async () => {},
    logout: async () => {}
});

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    const login = async (d) => {
        // console.log("d",d);
        await requestHandler(
            async () => await loginUser(d),
            setIsLoading,
            (res) => {
                // console.log(res);
                const {data} = res;
                setUser(data.user);
                setToken(data.accessToken);
                LocalStorage.set("user", data.user);
                LocalStorage.set("token", data.accessToken);
                navigate("/home");
            },
            alert
        );
    };

    const register = async (data) => {
        await requestHandler(
            async () => await registerUser(data),
            setIsLoading,
            () => {
                alert("Account created successfuly! Go ahead and login");
                navigate("/login");
            },
            alert
        );
    };

    const logout = async () => {
        await requestHandler(
            async () => await logoutUser(),
            setIsLoading,
            () => {
                setUser(null);
                setToken(null);
                LocalStorage.clear();
                navigate("/login");
            },
            alert 
        );
    };

    useEffect(() => {
        setIsLoading(true);
        const _token = LocalStorage.get("token");
        const _user = LocalStorage.get("user");
        if(_token && _user?._id){
            setUser(_user);
            setToken(_token);
        }
        setIsLoading(false);
    }, []);

    return (
        <AuthContext.Provider value = {{user, login, register, logout, token, isLoading}}>
            {isLoading ? <Loader isLoading={isLoading}/> : children}
            {/* {children} */}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider, useAuth };


