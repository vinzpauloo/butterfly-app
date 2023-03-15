import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IAlbumParams {
  data: {
    filter?: string;
    paginate?: number;
  };
  token: string;
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

  const getAlbumById = (albumId: string) => {
    return request({
      headers: getHeaders(),
      url: `/albums/${albumId}`,
      method: "GET",
    });
  };

  return { getAlbums, getAlbumById };
};

export default AlbumService;
