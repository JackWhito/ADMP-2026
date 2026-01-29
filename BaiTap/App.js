import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./global.css"

import SplashScreen from "./screens/SplashScreen.js";
import SignupScreen from "./screens/SignupScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import VerifyScreen from "./screens/VerifyScreen.js";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen.js";
import ResetPasswordScreen from "./screens/ResetPasswordScreen.js";
import AdminCheckScreen from "./screens/AdminCheckScreen.js";

import { AuthProvider } from "./context/authContext.js";
import MainTabs from "./navigation/MainTabs.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <View style={{flex:1, backgroundColor:"#36393e"}}>
      <NavigationContainer>
      <AuthProvider>
      <Stack.Navigator screenOptions={{ headerShown: false, animation:"fade" }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Verify" component={VerifyScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="AdminCheck" component={AdminCheckScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
    </View>
  );
}
