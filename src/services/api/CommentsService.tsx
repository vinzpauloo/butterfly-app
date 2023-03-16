import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface ICommentsParams {
  data: {
    comment_id?: string;
    site_id?: number;
    foreign_id?: string;
    customer_id?: string;
    comment?: string;
    type?: "comments" | "replies" | "work" | "feed"
    paginate?: number
    page?: number
  }
  token: string
}

const CommentsService = () => {
  const getComments = (params: ICommentsParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/comments/pagination",
      method: "GET",
      params: params.data,
    });
  };

  const addComment = (params: ICommentsParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/comments",
      method: "POST",
      params: params.data,
    });
  };

  const replyComment = (params: ICommentsParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/comments/reply",
      method: "POST",
      params: params.data,
    });
  };

  return { getComments, addComment, replyComment };
};

export default CommentsService;
