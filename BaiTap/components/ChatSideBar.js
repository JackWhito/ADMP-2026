import { View, StyleSheet, FlatList, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const GROUPS = [
  { id: "1", name: "General" },
  { id: "2", name: "Dev" },
  { id: "3", name: "Design" },
];

export default function ChatSidebar() {
  return (
    <View className="w-[72px] bg-dark items-center">
      <TouchableOpacity className="mt-[12px] w-[48px] h-[48px] rounded-[12px] bg-highlight justify-center items-center mb-[16px]">
        <Ionicons name="chatbubble" size={27} color="white" />
      </TouchableOpacity>
      <View className="flex-1">
        <FlatList
            data={GROUPS}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{gap:12}}
            renderItem={({ item }) => (
            <TouchableOpacity className="w-[48] h-[48] rounded-[24px] bg-sidebar justify-center items-center">
                <Text className="text-white font-bold text-[16px]">
                  {item.name.charAt(0)}
                </Text>
              </TouchableOpacity>
            )}
        />
        <TouchableOpacity className="mt-[12px] w-[48px] h-[48px] rounded-[24px] bg-primary justify-center items-center">
            <Ionicons name="add" size={27} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 72,
    backgroundColor: "#020617",
    paddingVertical: 12,
    alignItems: "center",
  },
  list: {
    gap: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  addButton: {
    marginTop: 12,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
  },
});
