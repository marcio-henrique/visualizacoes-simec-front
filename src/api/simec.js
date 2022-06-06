import request from "./request";

const resource = "/api/simec";
export default {
  groupBy(options) {
    return request.$http.get(`${resource}/grouped-by`, options);
  },
  count(options) {
    return request.$http.get(`${resource}/count`, options);
  },
};
