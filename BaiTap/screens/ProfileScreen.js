import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import {publicAxiosInstance} from "../lib/axios.js"
import Toast from "react-native-toast-message";

import { clearAuthUser } from "../db/authDB.js";

export default function ProfileScreen({navigation}) {
  const {top} = useSafeAreaInsets();
  const { authUser, checkAuth, setAuthUser, setIsCheckingAuth } = useAuth();

  useEffect(() => {
    checkAuth();
    if (!authUser) {
      navigation.replace("Login");
    }
  }, []);

  

  const logout = async () => {
    try{
      await SecureStore.deleteItemAsync('token');
      await publicAxiosInstance.post("/auth/logout");
      await clearAuthUser();
      setAuthUser(null);
      Toast.show({
        type: "success",
        text1: "Logged out successfully.",
      });
      setIsCheckingAuth(false);
      navigation.replace("Login");
    } catch (error) {
      console.log("Error in logout:", error);
      Toast.show({
        type: 'error',
        text1: 'Logout failed.'
      });
    }
  }
  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
  }
  return (
    <View className="flex-1 bg-zinc-900 justify-center items-center" style={{paddingTop:top}}>
        <Text className='text-white text-[24px]'>Profile Tab</Text>
        <Text className='text-white text-[24px] items-start'>{authUser.email}</Text>
        <Text className='text-white text-[24px] items-start'>{authUser.fullName}</Text>
        <Text className='text-white text-[24px]'>{authUser.role}</Text>
        <TouchableOpacity className="mt-[12px] w-[148px] h-[48px] rounded-[12px] bg-highlight justify-center items-center mb-[16px] flex-row" onPress={handleLogout}>
            <Ionicons name="log-out" size={27} color="white" />
            <Text className='text-white ml-[4px]'>Logout</Text>
        </TouchableOpacity>
    </View>
  );
}
