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

  const getAds = (params) => {
    return request({
      headers: { ...getHeaders(), locale: params.lang },
      url: "/advertisements",
      method: "GET",
    });
  };

  const getAnnouncement = (token: string, locale: string) => {
    return request({
      headers: {
        ...getHeaders(),
        Authorization: `Bearer ${token}`,
        locale: locale,
      },
      url: "/announcements",
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
