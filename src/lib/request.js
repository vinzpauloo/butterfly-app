import axios from "axios";
import { API_BASE_URL } from "react-native-dotenv";

// to have a delay in fetching data to see the loading component
function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const client = (() => {
  return axios.create({
    baseURL: API_BASE_URL,
  });
})();

const request = async function (options, store) {
  //success handler
  const onSuccess = async function (response) {
    const {
      data: { message, data },
    } = response;
    await sleep(); // for delaying the return of data
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
