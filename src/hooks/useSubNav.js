import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

export const SubNav = () => {
  const getSubNav = () => {
    return request({
      headers: getHeaders(),
      url: "/navbar/1",
      method: "GET",
    });
  };

  const getWorkGroup = (data) => {
    return request({
      headers: getHeaders(),
      url: "/workgroup",
      method: "GET",
      params: data, //{site_id: 1, navbar: selection}
    });
  };

  const getWork = (id) => {
    return request({
      headers: getHeaders(),
      url: `/work/${id}`,
      method: "GET",
    });
  };

  return { getSubNav, getWorkGroup, getWork };
};
