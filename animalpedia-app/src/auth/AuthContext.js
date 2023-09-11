import { createContext, useContext, useState, useEffect } from 'react';
import axiosRequests from '../api/apiCalls';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('')

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = async () => {
        localStorage.removeItem('accessToken');
        await axiosRequests.logout();
        setIsLoggedIn(false);
    };

    useEffect(() => {

        const checkAuth = async () => {
            try {
                await axiosRequests.checkRefreshToken()
                    .then(res => {
                        if (res.status === 200) {
                            setIsLoggedIn(true);
                            setUsername(res.data.username)
                        }
                    });

            } catch (error) {
                // console.error(error)
            }
        };

        checkAuth();
    }, [])



    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, username }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
