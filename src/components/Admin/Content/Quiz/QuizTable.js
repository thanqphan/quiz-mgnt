import { useEffect, useState } from "react";
import { getAllQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";
import { BiEditAlt } from "react-icons/bi";
import { PiTrash } from "react-icons/pi";

const QuizTable = (props) => {
  const { listQuizzes } = props;

  return (
    <>
      <table className="table table-hover table-bordered caption-top rounded">
        <caption>List of quizzes</caption>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Type</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listQuizzes &&
            listQuizzes.length > 0 &&
            listQuizzes.map((quiz, index) => {
              return (
                <tr key={`data-quiz-table-${quiz.id}`}>
                  <th scope="row">{quiz.id}</th>
                  <td>{quiz.name}</td>
                  <td>{quiz.description}</td>
                  <td>{quiz.difficulty}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => {
                        props.handleClickBtnUpdateQuiz(quiz);
                      }}
                    >
                      <BiEditAlt />
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        props.handleClickBtnDeleteQuiz(quiz);
                      }}
                    >
                      <PiTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          {listQuizzes && listQuizzes.length === 0 && (
            <tr>
              <td colSpan={"4"}>No Data Founds</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default QuizTable;
