import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

const ChatService = () => {
  const getChats = (token: string) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${token}` },
      url: "/mobile/chats",
      method: "GET",
    });
  };

  return { getChats };
};

export default ChatService;
