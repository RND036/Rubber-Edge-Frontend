// context/AuthContext.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { setChatAuthToken } from '../config/chatApi'; // make sure this path is correct

interface User {
  id: number;
  name?: string;
  phone_number: string;
  role: 'farmer' | 'buyer' | 'officer';
  farmer_profile?: {
    name: string;
    nic_number: string;
    farm_location: string;
    district: string;
    land_area_hectares: string;
  };
  buyer_profile?: {
    company_name: string;
    business_reg_number: string;
  };
  officer_profile?: {
    name: string;
    employee_id: string;
    department: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  accessToken: string | null;                         // <-- added
  refreshToken: string | null;                        // <-- added
  login: (userData: User, tokens: {access: string; refresh: string}) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: User) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);   // <-- added
  const [refreshToken, setRefreshToken] = useState<string | null>(null); // <-- added

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      const storedAccessToken = await AsyncStorage.getItem('accessToken');
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');

      if (userData && storedAccessToken) {
        const parsedUser: User = JSON.parse(userData);
        setUser(parsedUser);
        setAccessToken(storedAccessToken);
        setRefreshToken(storedRefreshToken);
        setChatAuthToken(storedAccessToken);          // keep chat axios authed
      }
    } catch (error) {
      console.log('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (userData: User, tokens: {access: string; refresh: string}) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      await AsyncStorage.setItem('accessToken', tokens.access);
      await AsyncStorage.setItem('refreshToken', tokens.refresh);

      setUser(userData);
      setAccessToken(tokens.access);
      setRefreshToken(tokens.refresh);
      setChatAuthToken(tokens.access);                // important for chat
    } catch (error) {
      console.log('Login storage error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.multiRemove(['user', 'accessToken', 'refreshToken']);
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      setChatAuthToken(null);                         // clear chat auth
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const updateUser = async (userData: User) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.log('Update user error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        accessToken,
        refreshToken,
        login,
        logout,
        updateUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
