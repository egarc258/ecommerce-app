import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse, LoginRequest, RegisterRequest } from '../types';
import { authAPI } from '../services/api';

interface AuthContextType {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
    error: string | null;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const isAuthenticated = !!token && !!user;

    // Initialize auth state from localStorage
    useEffect(() => {
        const initAuth = async () => {
            try {
                const storedToken = localStorage.getItem('token');

                if (storedToken) {
                    setToken(storedToken);
                    // Verify token is still valid by getting current user
                    const userData = await authAPI.getCurrentUser();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                // Token is invalid, clear storage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                setToken(null);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (data: LoginRequest): Promise<void> => {
        try {
            setError(null);
            setLoading(true);

            const authResponse: AuthResponse = await authAPI.login(data);

            const userData: User = {
                id: authResponse.id,
                firstName: authResponse.firstName,
                lastName: authResponse.lastName,
                email: authResponse.email,
                role: authResponse.role,
                active: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            setToken(authResponse.token);
            setUser(userData);

            // Store in localStorage
            localStorage.setItem('token', authResponse.token);
            localStorage.setItem('user', JSON.stringify(userData));

        } catch (error: any) {
            console.error('Login error:', error);
            setError(error.response?.data?.message || 'Login failed. Please try again.');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: RegisterRequest): Promise<void> => {
        try {
            setError(null);
            setLoading(true);

            const authResponse: AuthResponse = await authAPI.register(data);

            const userData: User = {
                id: authResponse.id,
                firstName: authResponse.firstName,
                lastName: authResponse.lastName,
                email: authResponse.email,
                role: authResponse.role,
                active: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            setToken(authResponse.token);
            setUser(userData);

            // Store in localStorage
            localStorage.setItem('token', authResponse.token);
            localStorage.setItem('user', JSON.stringify(userData));

        } catch (error: any) {
            console.error('Registration error:', error);
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = (): void => {
        setUser(null);
        setToken(null);
        setError(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    const clearError = (): void => {
        setError(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                loading,
                login,
                register,
                logout,
                error,
                clearError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};