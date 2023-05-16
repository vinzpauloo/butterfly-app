import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IGetSearchPage {
  data: {
    keyword?: boolean;
    creator_only?: boolean;
    work_only?: boolean;
    feed_only?: boolean;
    page?: number;
  };
  token: string;
}
interface IDeleteSearchHistory {
  token?: string;
  data: {
    keyword?: string;
    all?: boolean;
  };
}
interface SearchPageRecommendedHistory {
  token?: string;
  data: {
    sort_by?: string;
    sort?: string;
  };
}

const GeneralSearch = () => {
  const getSearchPageRecommended = (params: SearchPageRecommendedHistory) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/search/recommended",
      method: "GET",
      params: params.data,
    });
  };
  const getSearchPage = (params: IGetSearchPage) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/search",
      method: "GET",
      params: params.data,
    });
  };
  const deleteSearchHistory = (params: IDeleteSearchHistory) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/search",
      method: "DELETE",
      params: params.data,
    });
  };

  return { getSearchPageRecommended, getSearchPage, deleteSearchHistory };
};

export default GeneralSearch;
