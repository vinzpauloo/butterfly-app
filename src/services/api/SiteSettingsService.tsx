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

  const getAds = () => {
    return request({
      headers: getHeaders(),
      url: `/advertisement`,
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
