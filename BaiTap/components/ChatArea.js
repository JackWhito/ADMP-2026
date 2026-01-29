import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MESSAGES = [
  { id: "1", text: "Hello everyone!" },
  { id: "2", text: "Welcome to the group" },
  { id: "3", text: "Let's build something 🚀" },
  // add more → scroll works
];
export default function ChatArea() {
  return (
    <View className="flex-1 bg-zinc-900">

      {/* Title */}
      <View className="px-[16px] py-[12px] border-zinc-800">
        <Text className="text-white text-[18px] font-semibold">
          Chat Messages
        </Text>
      </View>

      {/* Search bar */}
      <View className="h-[48px] px-[16px] flex-row items-center border-zinc-800">
        <TouchableOpacity
            activeOpacity={0.7}
            className="w-[38] h-[38] rounded-[24px] bg-sidebar justify-center items-center"
        >
            <Ionicons name="search" size={18} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity
            activeOpacity={0.7}
            className="ml-[8px] flex-row items-center justify-center bg-sidebar rounded-[24px] w-[240px] h-[38px]"
        >
            <Ionicons name="person-add" size={18} color="white" />
            <Text className="text-white ml-[12px]">Add Friends</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable messages */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          padding: 16,
          gap: 12,
        }}
        showsVerticalScrollIndicator={false}
      >
        {MESSAGES.map((msg) => (
          <View
            key={msg.id}
            className="bg-zinc-800 rounded-[12px] px-[12px] py-[8px]"
          >
            <Text className="text-white">{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

    </View>
  );
}

