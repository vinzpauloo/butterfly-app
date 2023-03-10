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

const GeneralSearch = () => {
  const getSearchPageRecommended = (token: string) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${token}` },
      url: "/search/recommended",
      method: "GET",
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
