import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";

interface IAlbumParams {
  filter?: string;
}

const AlbumService = () => {
  const getAlbums = (params: IAlbumParams) => {
    return request({
      headers: getHeaders(),
      url: "/albums",
      method: "GET",
      params,
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
