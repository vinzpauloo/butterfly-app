import request from "lib/request";

export const Follow = () => {
  const postFollowChecker = (data) => {
    return request({
      url: "/customer/follow-checker",
      method: "POST",
      data: data,
    });
  };

  const postFollowCreator = (data) => {
    return request({
      url: "/customer/follow-creator",
      method: "POST",
      data: data,
    });
  };

  const deleteUnfollowCreator = (data) => {
    const { user_id, customer_id } = data;
    return request({
      url: `/customer/unfollow-creator/${user_id}/${customer_id}`,
      method: "DELETE",
    });
  };

  return { postFollowChecker, postFollowCreator, deleteUnfollowCreator };
};
