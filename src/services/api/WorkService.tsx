import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IWorksParams {
  ads?: boolean;
  orientation?: string;
  owner_only?: boolean;
  page?: number;
  tag?: string;
  user_id?: number;
  with?: string;
}

interface IWorkFollowing {
  following_only: boolean;
  customer_id: string;
  page: number;
  paginate: number;
}

const WorkService = () => {
  const getWorks = (params: IWorksParams) => {
    return request({
      headers: getHeaders(),
      url: "/work",
      method: "GET",
      params,
    });
  };

  const getWorkById = (work_id: string) => {
    return request({
      headers: getHeaders(),
      url: `/work/${work_id}`,
      method: "GET",
    });
  };

  const getWorkFollowing = (params: IWorkFollowing) => {
    return request({
      headers: getHeaders(),
      url: "/work",
      get: "GET",
      params,
    });
  };

  return { getWorks, getWorkById, getWorkFollowing };
};

export default WorkService;
