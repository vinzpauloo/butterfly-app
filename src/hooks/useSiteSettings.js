import request from "utils/request";

export const useSiteSettings = () => {
  const getNavbar = (siteId: number = 1) => {
    return request({
      url: `/navbar/${siteId}`,
      method: "GET",
    });
  };

  return { getNavbar };
};