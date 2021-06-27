import axios from "axios";

const url = "/anecdotes";

const getAll = async () => {
  const res = await axios.get(url);
  return res.data;
};

const createNew = async (content) => {
  const anecdote = { content, votes: 0 };
  const res = await axios.post(url, anecdote);
  return res.data;
};

export default {
  getAll,
  createNew,
};
