import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IAlbumParams {
  data: {
    filter?: string;
    page?: number;
    paginate?: number;
    albumId?: number;
  };
  token: string;
}

interface IAlbumSingleParams {
  albumId: number;
  token: string;
  page: number;
}

const AlbumService = () => {
  const getAlbums = (params: IAlbumParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: "/albums",
      method: "GET",
      params: params.data,
    });
  };

  const getAlbumById = (params: IAlbumSingleParams) => {
    return request({
      headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      url: `/albums/${params.albumId}`,
      method: "GET",
      params: { page: params.page },
    });
  };

  return { getAlbums, getAlbumById };
};

export default AlbumService;
