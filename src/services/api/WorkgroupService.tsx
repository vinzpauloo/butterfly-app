import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IWorkgroupParams {
  navbar: string;
  page: number;
  paginate: number;
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
