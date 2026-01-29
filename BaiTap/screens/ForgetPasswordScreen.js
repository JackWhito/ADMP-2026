import { View, Text, TouchableOpacity, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { axiosInstance } from "../lib/axios";
import { useState } from "react";
import { useAuth } from "../context/authContext.js";
import Toast from "react-native-toast-message";

export default function ForgetPassword({ navigation, route }) {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const {setAuthUser} = useAuth();
    const handleVerify = async() => {
        try {
            const isValid = validateForm();
            if(!isValid) return;
            const res = await axiosInstance.post("/auth/verify-otp", {
                email: email,
                otp
            });
            setAuthUser(res.data);
            Toast.show({
                type: 'success',
                text1: 'OTP verified successfully.'
            });
            navigation.replace("ResetPassword", {userId: res.data._id});
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: error.response.data.message
            });
            console.log("Error in handleVerify:", error.response.data.message);
        }
    };

    const handeSendOTP = async () => {
        try {
            const res = await axiosInstance.post("/auth/forget-password", {
                email
            });
            Toast.show({
                type: 'success',
                text1: 'OTP sent to email.'
            });
        }
        catch (error) {
            console.log("Error in sending OTP:", error.response.data.message);
            Toast.show({
                type: 'error',
                text1: error.response.data.message
            });
        }
    };

    const validateForm = () => {
        if(!email.trim()) return Toast.show({
            type: 'error',
            text1: 'Email is required.'
        });
        if(!/\S+@\S+\.\S+/.test(email)) return Toast.show({
            type: 'error',
            text1: 'Email is invalid.'
        });
        if(!otp.trim()) return Toast.show({
            type: 'error',
            text1: 'OTP is required.'
        });
        return true;
    }

  return (
    <View className="flex-1 justify-center items-center pl-[20] bg-primary">
      <Text className="text-[24px] font-semibold text-white mb-3">Forget Password</Text>
      <TextInput placeholderTextColor="white" autoCapitalize="none" placeholder="Email" className="w-4/5 h-[40] border-gray-500 border-[1px] my-[8] pl-[8]" value={email} onChangeText={(text) => setEmail(text)} />
      <View className="m-[12] justify-center flex-row items-center w-3/5">
        <TouchableOpacity className="mt-[12px] w-[148px] h-[48px] rounded-[12px] bg-highlight justify-center items-center mb-[16px] flex-row " onPress={handeSendOTP}>
            <Ionicons name="mail" size={27} color="white" />
            <Text className='text-white ml-[4px]'>Send OTP</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-[24px] font-semibold text-white mb-3">Enter OTP</Text>
      <TextInput placeholderTextColor="white" autoCapitalize="none" placeholder="Enter OTP" keyboardType="numeric" className="w-4/5 h-[40] border-gray-500 border-[1px] my-[8] pl-[8]" value={otp} onChangeText={(text) => setOtp(text)} />
      <View className="m-[12] justify-center flex-row items-center w-3/5">
        <TouchableOpacity className="mt-[12px] w-[148px] h-[48px] rounded-[12px] bg-highlight justify-center items-center mb-[16px] flex-row " onPress={handleVerify}>
            <Ionicons name="checkbox" size={27} color="white" />
            <Text className='text-white ml-[4px]'>Verify</Text>
        </TouchableOpacity>
      </View>
    <Pressable onPress={() => navigation.replace("Signup")}>
        <Text className="text-highlight">Sign up</Text>
    </Pressable>
    </View>
  );
}


