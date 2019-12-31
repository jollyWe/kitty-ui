import axios from "axios";

let baseURL = ""; // 自定义请求路径
// 获取列表分页
export const getPlanListPage = params => {
  return axios.get(`${baseURL}/flight/getListPage`, { params: params });
};
