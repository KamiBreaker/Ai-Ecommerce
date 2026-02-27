'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface UserContextType {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('fashion_user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const setUserWithStorage = (userData: User) => {
        setUser(userData);
        localStorage.setItem('fashion_user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('fashion_user');
    };

    return (
        <UserContext.Provider value={{
            user,
            setUser: setUserWithStorage,
            logout,
            isAuthenticated: !!user,
            isAdmin: user?.role === 'ADMIN'
        }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}
