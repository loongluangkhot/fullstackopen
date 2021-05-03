import axios from "axios";
import loginService from "./login";
const baseUrl = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (blog) => {
  const loggedInUser = loginService.getCurrentlyLoginUser();
  if (!loggedInUser) {
    throw new Error("Blog creation is only possible after logging in!");
  }
  const token = loggedInUser.token;
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const request = await axios.post(baseUrl, blog, config);
  return request.data;
};

const update = async (blog) => {
  const loggedInUser = loginService.getCurrentlyLoginUser();
  if (!loggedInUser) {
    throw new Error("Blog creation is only possible after logging in!");
  }
  const token = loggedInUser.token;
  const config = {
    headers: { Authorization: `bearer ${token}` },
  };
  const blogId = blog.id;
  const request = await axios.put(`${baseUrl}/${blogId}`, blog, config);
  return request.data;
}

const blogService = { getAll, create, update };
export default blogService;
