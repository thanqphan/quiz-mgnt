import axios from "axios";
import nProgress from "nprogress";
import { store } from "../redux/store";

const instance = axios.create({
  baseURL: "http://localhost:8081/",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

nProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = store?.getState()?.user?.account?.access_token;
    config.headers["Authorization"] = `Bearer ${accessToken}`;

    nProgress.start();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    nProgress.done();
    return response && response.data ? response.data : response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    nProgress.done();
    //token expired: EC===-999
    if (error.response.data && error.response.data.EC === -999) {
      window.location.href = "/login";
    }

    return error && error.response && error.response.data
      ? error.response.data
      : Promise.reject(error);
  }
);

export default instance;
