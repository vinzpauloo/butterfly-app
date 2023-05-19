import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IChats {
  token: string;
  data: {
    page: number;
    paginate?: number;
  };
}

interface ISingleChatParams {
  token: string;
  chatId: string;
  data: {
    page?: number;
    paginate?: number;
    sort_by: string;
    sort: string;
  };
}

interface INewChatParams {
  token: string;
  data: {
    message: string;
    to_id: string;
  };
}

const ChatService = () => {
  const getChats = (token: string) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${token}` },
      url: "/mobile/chats",
      method: "GET",
    });
  };

  const getAllChats = (params: IChats) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/mobile/chats/contacts",
      method: "GET",
      params: params.data,
    });
  };

  const getSingleChat = (params: ISingleChatParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: `/mobile/chats/user/${params.chatId}`,
      method: "GET",
      params: params.data,
    });
  };

  const postChat = (params: INewChatParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/mobile/chats",
      method: "POST",
      data: params.data,
    });
  };

  return { getChats, getAllChats, getSingleChat, postChat };
};

export default ChatService;
