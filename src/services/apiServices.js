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
const postCreateQuiz = (description, name, difficulty, image) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);

  return axios.post("api/v1/quiz", data);
};
const getAllQuiz = () => {
  return axios.get("/api/v1/quiz/all");
};
const putUpdateQuiz = (id, description, name, difficulty, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", image);

  return axios.put("api/v1/quiz", data);
};
const deleteQuiz = (id) => {
  return axios.delete(`api/v1/quiz/${id}`);
};
const postCreateNewQuestionForQuiz = (id, description, image) => {
  const data = new FormData();
  data.append("quiz_id", id);
  data.append("description", description);
  data.append("questionImage", image);

  return axios.post("api/v1/question", data);
};
const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axios.post("api/v1/answer", {
    description,
    correct_answer,
    question_id,
  });
};
const postAssignQuiz = (quizId, userId) => {
  return axios.post("api/v1/quiz-assign-to-user", {
    quizId,
    userId,
  });
};
const getQuizWithQnA = (quizId) => {
  return axios.get(`api/v1/quiz-with-qa/${quizId}`);
};
const postUpsertQnA = (data) => {
  return axios.post(`api/v1/quiz-upsert-qa`, { ...data });
};
const postLogOut = (email, refresh_token) => {
  return axios.post("api/v1/logout", {
    email,
    refresh_token,
  });
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
  postCreateQuiz,
  getAllQuiz,
  putUpdateQuiz,
  deleteQuiz,
  postCreateNewAnswerForQuestion,
  postCreateNewQuestionForQuiz,
  postAssignQuiz,
  getQuizWithQnA,
  postUpsertQnA,
  postLogOut,
};
