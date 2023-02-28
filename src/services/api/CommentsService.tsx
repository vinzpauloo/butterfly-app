import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface ICommentsParams {
  comment_id?: string
  site_id?: number;
  foreign_id?: string;
  skip?: number;
  limit?: number;
  customer_id?: string;
  comment?: string;
  type?: string;
}

const CommentsService = () => {
  const getComments = (params: ICommentsParams) => {
    return request({
      headers: getHeaders(),
      url: "/comment/pagination",
      method: "GET",
      params,
    });
  };

  const addComment = (params: ICommentsParams) => {
    return request({
      headers: getHeaders(),
      url: "/comment",
      method: "POST",
      params,
    });
  };

  const replyComment = (params: ICommentsParams) => {
    return request({
      headers: getHeaders(),
      url: "/comment/reply",
      method: "POST",
      params,
    });
  };

  return { getComments, addComment, replyComment };
};

export default CommentsService;
