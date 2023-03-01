import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

export const SubNav = () => {
  const getSubNav = () => {
    return request({
      headers: getHeaders(),
      url: "/navbars",
      method: "GET",
    });
  };

  const getWorkGroup = (data) => {
    return request({
      headers: getHeaders(),
      url: "/workgroups",
      method: "GET",
      params: data, //{site_id: 1, navbar: selection}
    });
  };

  const getWork = (id) => {
    return request({
      headers: getHeaders(),
      url: `/works/${id}`,
      method: "GET",
    });
  };

  return { getSubNav, getWorkGroup, getWork };
};
