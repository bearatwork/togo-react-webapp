import axios from "axios";
import { Urls } from "../constants";

export const login = username => {
  return axios
    .post(`${Urls.baseApiUrl}/login`, { username })
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const createUser = username => {
  return axios
    .post(`${Urls.baseApiUrl}/user`, { username })
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};
