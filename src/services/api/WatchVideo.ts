import { getHeaders } from "lib/cryptoJs";
import request from "lib/request";
import axios from "axios";
import { API_BASE_URL_LOCAL, API_BASE_URL_SIT } from "react-native-dotenv";

interface IWatchVideoParams {
  data: {
    work_id: string;
  };
  token: string;
}

const WatchVideo = () => {
  const getDownloadVideo = async (params: IWatchVideoParams) => {
    const { data } = await axios({
      // headers: { ...getHeaders(), Authorization: `Bearer ${params.token}` },
      headers: {
        Accept: "application/json",
        "X-authorization": "postman|1",
        Authorization: `Bearer ${params.token}`,
      },
      url: `${API_BASE_URL_SIT}/videos/download`,
      method: "GET",
      params: params.data,
    });
    return data.data;
  };

  return { getDownloadVideo };
};

export default WatchVideo;
