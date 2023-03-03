import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface ICommentsParams {
  comment_id?: string;
  site_id?: number;
  foreign_id?: string;
  customer_id?: string;
  comment?: string;
  type?: "comments" | "replies"  | "work" | "feed"
  paginate?: number
  page?: number
}

const CommentsService = () => {
  const getComments = (params: ICommentsParams) => {
    return request({
      headers: getHeaders(),
      url: "/comments/pagination",
      method: "GET",
      params,
    });
  };

  const addComment = (params: ICommentsParams) => {
    return request({
      headers: getHeaders(),
      url: "/comments",
      method: "POST",
      params,
    });
  };

  const replyComment = (params: ICommentsParams) => {
    return request({
      headers: getHeaders(),
      url: "/comments/reply",
      method: "POST",
      params,
    });
  };

  return { getComments, addComment, replyComment };
};

export default CommentsService;
