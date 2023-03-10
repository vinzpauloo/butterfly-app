import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface ILike {
  data: { foreign_id?: string; type?: string };
  token: string;
}

const LikeService = () => {
  const likeWork = (params: ILike) => {
    console.log("@@@@", params);

    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/likes",
      method: "POST",
      data: params.data,
    });
  };

  const unlikeWork = (params: ILike) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/likes",
      method: "DELETE",
      params: params.data,
    });
  };

  const likeChecker = (params: ILike) => {
    console.log("@@@", params.data);

    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/likes/checker",
      method: "POST",
      data: params.data,
    });
  };

  const likesCount = (data) => {
    return request({
      headers: getHeaders(),
      url: `/likes/count/${data.foreign_id}`,
      method: "GET",
    });
  };

  return { likeWork, unlikeWork, likeChecker, likesCount };
};

export default LikeService;
