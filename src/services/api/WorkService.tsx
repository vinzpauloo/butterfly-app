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
  paginate?: number;
}

interface IWorkFollowing {
  data: {
    following_only: boolean;
    page: number;
    paginate: number;
  };
  token: string;
}

const WorkService = () => {
  const getWorks = (params: IWorksParams) => {
    return request({
      headers: getHeaders(),
      url: "/works",
      method: "GET",
      params,
    });
  };

  const getWorkById = (work_id: string) => {
    return request({
      headers: getHeaders(),
      url: `/works/${work_id}`,
      method: "GET",
    });
  };

  const getWorkFollowing = (params: IWorkFollowing) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/works",
      get: "GET",
      params: params.data,
    });
  };

  return { getWorks, getWorkById, getWorkFollowing };
};

export default WorkService;
