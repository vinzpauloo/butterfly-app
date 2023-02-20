import request from "lib/request";

export const useSiteSettings = () => {
  const getNavbar = (siteId = 1) => {
    return request({
      url: `/navbar/${siteId}`,
      method: "GET",
    });
  };

  const getAds = (siteId = 1) => {
    return request({
      url: `/advertisement?site_id=${siteId}`,
      method: "GET",
    });
  };

  const getAnnouncement = () => {
    return request({
      url: `/announcement/list`,
      method: "GET",
    });
  };

  return { getNavbar, getAds, getAnnouncement };
};
