import request from "utils/request";

export const SubNav = () => {
  const getSubNav = () => {
    return request({
      url: "/navbar/1",
      method: "GET",
    });
  };

  const getWorkGroup = (tabName) => {
    return request({
      url: `/workgroup/${tabName}`,
      method: "GET",
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
