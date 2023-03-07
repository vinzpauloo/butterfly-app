import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IGetSearchPage {
  keyword?: boolean;
  creator_only?: boolean;
  work_only?: boolean;
  feed_only?: boolean;
  page?: number;
}

const GeneralSearch = () => {
  const getSearchPageRecommended = (token: string) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${token}` },
      url: "/search/recommended",
      method: "GET",
    });
  };
  const getSearchPage = (params: IGetSearchPage, token: string) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${token}` },
      url: "/search",
      method: "GET",
      params,
    });
  };

  return { getSearchPageRecommended, getSearchPage };
};

export default GeneralSearch;
