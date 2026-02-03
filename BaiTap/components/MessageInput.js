import { View, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import {useEffect, useState} from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const MessageInput = () => {
    const {bottom} = useSafeAreaInsets();
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [text, setText] = useState("");
    useEffect(() => {
      const show = Keyboard.addListener("keyboardDidShow", () =>
        setKeyboardVisible(true)
      );
      const hide = Keyboard.addListener("keyboardDidHide", () =>
        setKeyboardVisible(false)
      );

      return () => {
        show.remove();
        hide.remove();
      };
    }, []);
  return (
    <View
      className="w-full bg-sidebar px-3 pt-2"
      style={{ paddingBottom: keyboardVisible ? 6 : bottom }}
    >
      <View className="flex-row items-end gap-2">
        
        {/* Add image button */}
        <TouchableOpacity className="pb-2">
          <Ionicons name="image-outline" size={24} color="#d4d4d8" />
        </TouchableOpacity>

        {/* Input box */}
        <View className="flex-1 bg-zinc-800 rounded-2xl px-4 py-2">
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Type a message"
            placeholderTextColor="#a1a1aa"
            multiline
            className="text-white max-h-[120px]"
          />
        </View>

        {/* Send button */}
        <TouchableOpacity
          disabled={!text.trim()}
          className={`pb-2 ${!text.trim() && "opacity-40"}`}
        >
          <Ionicons name="send" size={24} color="#60a5fa" />
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default MessageInput