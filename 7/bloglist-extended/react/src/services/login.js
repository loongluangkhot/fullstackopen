import axios from "axios";
const baseUrl = "/api/login";

const getCurrentlyLoginUser = () => {
  const json = window.localStorage.getItem("user");
  return JSON.parse(json);
};

const login = async (credentials) => {
  const res = await axios.post(baseUrl, credentials);
  const user = res.data;
  window.localStorage.setItem("user", JSON.stringify(user));
  return user;
};

const logout = () => {
  window.localStorage.removeItem("user");
};

const loginService = { getCurrentlyLoginUser, login, logout };
export default loginService;
