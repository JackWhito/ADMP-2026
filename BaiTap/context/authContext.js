import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import {
  initAuthDB,
  saveAuthUser,
  getAuthUser,
  clearAuthUser,
} from "../db/authDB";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const checkAuth = async () => {
    try{
      await initAuthDB();

      const token = await SecureStore.getItemAsync('token');

      if (!token) {
        const offlineUser = await getAuthUser();
        setAuthUser(offlineUser);
        return;
      }

      const res = await axiosInstance.get("/auth/check");
      setAuthUser(res.data);
      saveAuthUser(res.data);
    } catch (error) {
      console.log("Error in checkAuth:", error.response.data.message);
      setAuthUser(null);
      clearAuthUser();
    } finally {
      setIsCheckingAuth(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        isCheckingAuth,
        checkAuth,
        setAuthUser,
        setIsCheckingAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);