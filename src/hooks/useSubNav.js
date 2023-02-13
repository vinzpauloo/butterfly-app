import request from "utils/request";

export const SubNav = () => {
  const getSubNav = () => {
    return request({
      url: "/navbar/1",
      method: "GET",
    });
  };

  const getWorkGroup = (data) => {
    return request({
      url: "/workgroup",
      method: "GET",
      params: data, //{site_id: 1, navbar: selection}
    });
  };

  const getWork = (id) => {
    return request({
      url: `/work/${id}`,
      method: "GET",
    });
  };

  return { getSubNav, getWorkGroup, getWork };
};
