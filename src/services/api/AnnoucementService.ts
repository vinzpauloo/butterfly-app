import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IPostDonateParams {
  data: {
    sort_by: string;
    sort: string;
    page: number;
    paginate: number;
  };
  token: string;
}

const AnnoucementService = () => {
  const getAnnouncementLists = (params: IPostDonateParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/announcements/list",
      method: "GET",
      data: params.data,
    });
  };

  return { getAnnouncementLists };
};

export default AnnoucementService;
