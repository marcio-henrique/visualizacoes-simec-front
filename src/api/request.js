import axios from "axios";

export default {
  get $http() {
    const client = axios.create({
      baseURL: process.env.VUE_APP_API_BASE_URL,
    });

    return client;
  },
};
