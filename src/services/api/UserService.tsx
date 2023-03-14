import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IUserParams {
  data: {
    user_id?: number;
    paginate?: number;
    page?: number;
  };
  token: string;
}

const UserService = () => {
  const getSpecificContentCreator = (params: IUserParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: `/content-creators/${params.data.user_id}`,
      method: "GET",
    });
  };

  const getAllFollowerList = (params: IUserParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/followers/list",
      method: "GET",
      params: params.data,
    });
  };

  const getFollowersCount = (params: IUserParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: `/followers/count/${params.data.user_id}`,
      method: "GET",
    });
  };

  const getDonatorsCount = (params: IUserParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: `/customers/total-donators/${params.data.user_id}`,
      method: "GET",
    });
  };

  return {
    getSpecificContentCreator,
    getAllFollowerList,
    getFollowersCount,
    getDonatorsCount,
  };
};

export default UserService;
