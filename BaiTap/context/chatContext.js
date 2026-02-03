import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios.js";
import { useAuth } from "./authContext.js";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const { authUser } = useAuth();

  const [chats, setChats] = useState([]);
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [chatError, setChatError] = useState(null);

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const getChats = async () => {
    if (!authUser) return;

    try {
      setIsLoadingChats(true);
      setChatError(null);

      const res = await axiosInstance.get("/chat");
      setChats(res.data);
    } catch (error) {
      console.error("Error fetching chats:", error.response?.data || error.message);
      setChatError("Failed to load chats");
    } finally {
      setIsLoadingChats(false);
    }
  };

  const getMessages = async (chatId) => {
    try {
      setLoadingMessages(true);
      const res = await axiosInstance.get(`/message/chat/${chatId}`);
      setMessages(res.data);
    } catch (error) {
      console.error("Get messages failed:", error);
    } finally {
      setLoadingMessages(false);
    }
  };
  // Fetch chats when user logs in
  useEffect(() => {
    if (authUser) {
      getChats();
    } else {
      setChats([]);
    }
  }, [authUser]);

  return (
    <ChatContext.Provider
      value={{
        chats,
        isLoadingChats,
        chatError,
        messages,
        loadingMessages,
        getChats,
        refreshChats: getChats,
        getMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChats = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChats must be used within a ChatProvider");
  }
  return context;
};
