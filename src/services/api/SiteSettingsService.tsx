import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

const SiteSettingsService = () => {
  const getNavbar = () => {
    return request({
      headers: getHeaders(),
      url: `/navbar`,
      method: "GET",
    });
  };

  const getAds = (siteId = 1) => {
    return request({
      headers: getHeaders(),
      url: `/advertisement?site_id=${siteId}`,
      method: "GET",
    });
  };

  const getAnnouncement = () => {
    return request({
      headers: getHeaders(),
      url: `/announcement/list`,
      method: "GET",
    });
  };

  return { getNavbar, getAds, getAnnouncement };
};

export default SiteSettingsService;
