import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import {
  getAllQuiz,
  getAllUsers,
  postAssignQuiz,
} from "../../../../services/apiServices";

const AssignQuiz = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [quizList, setQuizList] = useState([]);

  const [selectedUser, setSelectedUser] = useState({});
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchListQuizzes();
    fetchListUsers();
  }, []);

  const fetchListQuizzes = async () => {
    let res = await getAllQuiz();
    if (res && res.EC === 0) {
      let newQuizList = res.DT.map((item) => {
        return { value: item.id, label: `${item.id} - ${item.description}` };
      });
      setQuizList(newQuizList);
    } else {
      toast.error(res.EM);
    }
  };
  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      let newUserList = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setUserList(newUserList);
    } else {
      toast.error(res.EM);
    }
  };
  const handleAssignQuiz = async () => {
    let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="assign-quiz-container row">
      <div className="col-md-6 form-control">
        <label>Select Quiz</label>
        <Select
          options={quizList}
          onChange={setSelectedQuiz}
          defaultValue={selectedQuiz}
        />
      </div>
      <div className="col-md-6 form-control">
        <label>Select User</label>
        <Select
          options={userList}
          onChange={setSelectedUser}
          defaultValue={selectedUser}
        />
      </div>
      <div>
        <button
          className="btn btn-warning mt-3"
          onClick={() => handleAssignQuiz()}
        >
          Assign
        </button>
      </div>
    </div>
  );
};

export default AssignQuiz;
