import axios from "axios";
import { Urls } from "../constants";
import { AuthStore } from "../stores/auth.store";

const todosApi = axios.create({
  baseURL: `${Urls.baseApiUrl}`
});

todosApi.interceptors.request.use(
  config => {
    const id = AuthStore.getUserId();
    if (id) {
      config.headers["Authorization"] = id;
    }
    return config;
  },
  err => Promise.reject(err)
);

export const getTodos = () => {
  return todosApi
    .get(`${Urls.baseApiUrl}/todo`)
    .then(response => response.data || [])
    .catch(err => {
      throw err.response;
    });
};

export const getTodo = id => {
  return todosApi
    .get(`${Urls.baseApiUrl}/todo/${id}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const createTodo = todo => {
  return todosApi
    .post(`${Urls.baseApiUrl}/todo`, todo)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const updateTodo = todo => {
  return todosApi
    .put(`${Urls.baseApiUrl}/todo/${todo.id}`, todo)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};

export const deleteTodo = id => {
  return todosApi
    .delete(`${Urls.baseApiUrl}/todo/${id}`)
    .then(response => response.data)
    .catch(err => {
      throw err.response;
    });
};
