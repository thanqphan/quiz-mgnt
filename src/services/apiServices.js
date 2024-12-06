import axios from "../utils/axiosCustom";

const postCreateUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("api/v1/participant", data);
};
const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.put("api/v1/participant", data);
};
const deleteUser = (id) => {
  return axios.delete("api/v1/participant", { data: { id: id } });
};

const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};
const getAllUsersWithPaging = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
const postLogin = (email, password, delay) => {
  return axios.post(`api/v1/login`, { email, password, delay });
};
const postRegister = (email, username, password) => {
  return axios.post(`api/v1/register`, { email, username, password });
};
const getQuizByParticipant = () => {
  return axios.get(`api/v1/quiz-by-participant`);
};
const getQuestionByQuiz = (id) => {
  return axios.get(`api/v1/questions-by-quiz?quizId=${id}`);
};

const postQuizSubmit = (data) => {
  return axios.post(`api/v1/quiz-submit`, { ...data });
};

export {
  postCreateUser,
  getAllUsers,
  putUpdateUser,
  deleteUser,
  getAllUsersWithPaging,
  postLogin,
  postRegister,
  getQuizByParticipant,
  getQuestionByQuiz,
  postQuizSubmit,
};
