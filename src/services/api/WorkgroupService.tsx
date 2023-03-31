import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IWorkgroupParams {
  id?: string;
  navbar?: string;
  page: number;
  paginate: number;
  recently_updated?: boolean;
  most_viewed?: boolean;
  most_liked?: boolean;
  with?: string;
  lookup?: boolean;
}

const WorkgroupService = () => {
  const getWorkgroup = (params: IWorkgroupParams) => {
    return request({
      headers: getHeaders(),
      url: "/workgroups",
      method: "GET",
      params,
    });
  };

  return { getWorkgroup };
};

export default WorkgroupService;
