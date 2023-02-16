import request from "lib/request";

export const Like = () => {
  const getLikesCount = (id) => {
    return request({
      url: `/like-action/count/${id}`,
      method: "GET",
    });
  };
  const postLikeWork = (data) => {
    return request({
      url: "/likes",
      method: "POST",
      data: data,
    });
  };

  const postLikeChecker = (data) => {
    return request({
      url: "/likes/checker",
      method: "POST",
      data: data,
    });
  };

  const deleteLikeWork = (data) => {
    const { foreign_id, customer_id } = data;
    return request({
      url: `likes/${foreign_id}/${customer_id}`,
      method: "DELETE",
    });
  };

  return { getLikesCount, postLikeWork, postLikeChecker, deleteLikeWork };
};
