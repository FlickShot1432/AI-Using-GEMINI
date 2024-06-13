import axios from "axios";
import { METHODS } from "../utils/constant";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const axiosConfig = {
  baseURL: BASE_URL,
};

const createAxiosInstance = () => axios.create(axiosConfig);

const request = createAxiosInstance();
const cache = {};

const client = ({
  method = METHODS.POST,
  url = BASE_URL,
  data,
  useCache = false,
  invalidateQuery = false,
  ...rest
}) =>
  useCache && !invalidateQuery && cache[url]
    ? Promise.resolve(cache[url])
    : request({
        method,
        url,
        data,
        //   paramsSerializer,
        ...rest,
      });

export const clientWithHeaders = ({
  method = METHODS.POST,
  url = BASE_URL,
  data,
  useCache = false,
  invalidateQuery = false,
  ...rest
}) =>
  request({
    method,
    url,
    data,
    // paramsSerializer,
    ...rest,
  }).then((res) => res);

request.interceptors.response.use(
  (res) => res,
  (err) => {
    const originalRequest = err.config;
    const status = err.response?.status;
    const response = err.response?.data;
    if (status === 503) {
      const error = {
        originalRequest,
        status,
        message:
          "This service is unavailable right now, please try again later",
      };
      throw error;
    }
    if (status === 500) {
      const error = {
        originalRequest,
        status,
        message: response?.message
          ? response.message
          : "An unexpected error occurred, please try again later",
      };
      throw error;
    }
    if (status === 404) {
      const error = {
        originalRequest,
        status,
        message: response?.message
          ? response.message
          : "The requested content does not exist, please try again later",
      };
      throw error;
    }
    if (status === 401) {
      localStorage.clear();
      window.history.go("/");
    }

    const message = response ? response?.message : err.message;

    const error = { originalRequest, message, status };
    throw error;
  },
);

if (localStorage.getItem("persist:root")) {
  const user = JSON.parse(localStorage.getItem("persist:root")).auth;
  if (user) {
    const userData = JSON.parse(user);
    request.defaults.headers["token"] = userData?.token;
  }
}

export const setHeaderToken = (token) => {
  if (token) request.defaults.headers["token"] = token;
  else delete request.defaults.headers["token"];
};

export const setHeader = (key, value) => {
  if (value) {
    request.defaults.headers[key] = value;
  }
};

export default client;
