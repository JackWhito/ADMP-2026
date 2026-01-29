import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { axiosInstance } from "../lib/axios";
import Toast from "react-native-toast-message";

export default function SignupScreen({ navigation }) {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    const validateForm = () => {
        if(!formData.fullName.trim()) return Toast.show({
            type: 'error',
            text1: 'Full name is required.'
        });
        if(!formData.email.trim()) return Toast.show({
            type: 'error',
            text1: 'Email is required.'
        });
        if(!formData.password.trim()) return Toast.show({
            type: 'error',
            text1: 'Password is required.'
        });
        if(!/\S+@\S+\.\S+/.test(formData.email)) return Toast.show({
            type: 'error',
            text1: 'Email is invalid.'
        });
        if(formData.password.length < 6) return Toast.show({
            type: 'error',
            text1: 'Password must be at least 6 characters.'
        });
        return true;
    }
    
    const signup = async (data) => {
        try {
            const res = await axiosInstance.post("/auth/signup-jwt", data);
            Toast.show({
                type: 'success',
                text1: 'Signup successful.'
            });
            navigation.replace("Verify", {email: res.data.email});
        }
        catch (error) {
            Toast.show({
                type: 'error',
                text1: error.response.data.message
            });
        }
    }

    const handleSignup = (e) => {
        e.preventDefault();

        const isValid = validateForm();

        if(isValid) signup(formData);
    }

  return (
    <View className='flex-1 justify-center items-center bg-primary'>
        <Text className="text-[20px] text-white">Sign up</Text>
        <TextInput autoCapitalize="none" placeholder="Full Name" placeholderTextColor="white" className='h-[40] w-4/5 border-2 border-gray-50 my-[8] text-white' onChangeText={(text) => setFormData({...formData, fullName: text})} />
        <TextInput autoCapitalize="none" placeholder="Email" placeholderTextColor="white" className='h-[40] w-4/5 border-2 border-gray-50 my-[8] text-white' onChangeText={(text) => setFormData({...formData, email: text})}/>
        <TextInput autoCapitalize="none" placeholder="Password" placeholderTextColor="white" className='h-[40] w-4/5 border-2 border-gray-50 my-[8] text-white' secureTextEntry={true} onChangeText={(text) => setFormData({...formData, password: text})}/>
        <View className='flex-row justify-between items-center m-[10] content-between w-4/5'>
            <TouchableOpacity className="mt-[12px] w-[148px] h-[48px] rounded-[12px] bg-highlight justify-center items-center mb-[16px] flex-row " onPress={handleSignup}>
                <Image source={require("../assets/Discord-Symbol-White.png")} style={{width:35, height:25}} />
                <Text className='text-white ml-[4px]'>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity className="mt-[12px] w-[148px] h-[48px] rounded-[12px] bg-highlight justify-center items-center mb-[16px] flex-row" onPress={() => navigation.replace("Login")}>
                <Ionicons name="log-in" size={27} color="white" />
                <Text className='text-white ml-[4px]'>Login</Text>
            </TouchableOpacity>
        </View>
        <Pressable onPress={() => navigation.replace("ForgetPassword")}>
            <Text className="text-highlight" >Forget Password?</Text>
        </Pressable>
    </View>
    );
}

