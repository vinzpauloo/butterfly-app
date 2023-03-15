import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IWorksParams {
  data: {
    ads?: boolean;
    orientation?: string;
    owner_only?: boolean;
    page?: number;
    tag?: string;
    tags?: string;
    user_id?: number;
    with?: string;
    paginate?: number;
    creator_only?: boolean;
    recommended?: boolean;
    exclude?: string;
    random?: boolean;
  };
  token: string;
}

interface IWorkFollowing {
  data: {
    following_only: boolean;
    page: number;
    paginate: number;
    orientation?: string;
  };
  token: string;
}

interface IWorkById {
  workId: string;
  token: string;
}

const WorkService = () => {
  const getWorks = (params: IWorksParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/works",
      method: "GET",
      params: params.data,
    });
  };

  const getWorkById = (params: IWorkById) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: `/works/${params.workId}`,
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

  const getWorksPortrait = (params: IWorksParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/works",
      method: "GET",
      params: params.data,
    });
  };

  return { getWorks, getWorkById, getWorkFollowing, getWorksPortrait };
};

export default WorkService;
