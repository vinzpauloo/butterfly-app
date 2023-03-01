import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

const SiteSettingsService = () => {
  const getNavbar = () => {
    return request({
      headers: getHeaders(),
      url: "/navbars",
      method: "GET",
    });
  };

  const getAds = () => {
    return request({
      headers: getHeaders(),
      url: "/advertisements",
      method: "GET",
    });
  };

  const getAnnouncement = () => {
    return request({
      headers: getHeaders(),
      url: "/announcements/list",
      method: "GET",
    });
  };

  return { getNavbar, getAds, getAnnouncement };
};

export default SiteSettingsService;
