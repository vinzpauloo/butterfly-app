import axios from "axios";
import { API_BASE_URL } from "react-native-dotenv";

const client = (() => {
  return axios.create({
    baseURL: API_BASE_URL,
  });
})();

const request = async function (options, store) {
  //success handler
  const onSuccess = function (response) {
    const {
      data: { message, data },
    } = response;
    return data;
  };

  //error handler
  const onError = function (error) {
    return Promise.reject(error.response);
  };

  //adding success and error handler to client
  return client(options).then(onSuccess).catch(onError);
};

export default request;
