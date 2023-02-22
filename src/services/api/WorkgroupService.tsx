import request from "lib/request";

interface IWorkgroupParams {
  navbar: string;
  page: number;
  paginate: number;
}

const WorkgroupService = () => {
  const getWorkgroup = (params: IWorkgroupParams) => {
    return request({
      url: "/workgroup",
      method: "GET",
      params,
    });
  };

  return { getWorkgroup };
};

export default WorkgroupService;
