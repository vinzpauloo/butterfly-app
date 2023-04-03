import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface INavbarParams {
  Locale: string;
}

const SiteSettingsService = () => {
  const getNavbar = (params: INavbarParams) => {
    return request({
      headers: { ...getHeaders(), Locale: params.Locale },
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

  const getLatestVersion = () => {
    const params = {
      latest_only: true,
    };

    return request({
      headers: getHeaders(),
      url: "/apks",
      method: "GET",
      params,
    });
  };

  return { getNavbar, getAds, getAnnouncement, getLatestVersion };
};

export default SiteSettingsService;
