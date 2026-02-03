import { View, TouchableOpacity, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import ChatHeader from "../components/ChatHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MessageInput from "../components/MessageInput";
import { useRoute } from "@react-navigation/native";
import { useChats } from "../context/chatContext";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";

export default function ChatScreen() {
    const {top} = useSafeAreaInsets();
    const route = useRoute();
    const {authUser} = useAuth();
    const {chatId} = route.params;

    const { messages, getMessages, loadingMessages } = useChats();

    useEffect(() => {
        getMessages(chatId);
    }, [chatId])

    return (
        <View style={{paddingTop:top}} className="flex-1 bg-dark">
        <ChatHeader />
        <KeyboardAvoidingView
            style={{flex:1}}
            behavior= {Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={70}
            >
            <ScrollView className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => {
                const isMe = msg.sender._id === authUser._id;
                return (
                <View key={msg._id} className={`flex ${isMe ? "items-end" : "items-start"}`}>
                    <View className={`max-w-[75%] px-4 py-2 rounded-2xl ${
                    isMe
                    ? "bg-blue-600 rounded-tr-sm"
                    : "bg-gray-700 rounded-tl-sm"
                    }`}>
                        <Text className="text-white text-base">{msg.text}</Text>
                    </View>
                </View>
            )})}
            </ScrollView>
        </KeyboardAvoidingView>
        <MessageInput />
        </View>
    );
}
