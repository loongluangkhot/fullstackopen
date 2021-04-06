import axios from "axios";
const baseUrl = "/api/login";

const getCurrentlyLoginUser = () => {
  return window.localStorage.getItem("user");
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
