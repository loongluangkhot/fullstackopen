import Axios from "axios";
const BASE_URL = "/api/persons";

const getAll = () => {
  return Axios.get(BASE_URL).then((res) => res.data);
};

const create = (data) => {
  return Axios.post(BASE_URL, data).then((res) => res.data);
};

const remove = (id) => {
  return Axios.delete(`${BASE_URL}/${id}`);
};

const update = (id, data) => {
  return Axios.put(`${BASE_URL}/${id}`, data).then((res) => res.data);
};

export default { getAll, create, remove, update };
