import App from "./App";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import UserManagement from "./components/Admin/Content/UserManagement";
import Login from "./components/Auth/Login";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import QuizDetails from "./components/User/QuizDetails";
import QuizManagement from "./components/Admin/Content/Quiz/QuizManagement";
import QuestionManagement from "./components/Admin/Content/Question/QuestionManagement";
import PrivateRoute from "./routes/PrivateRoute";
import { Suspense } from "react";
import DashBoard from "./components/Admin/Content/DashBoard";

const NotFound = () => {
  return <div className="alert alert-danger container m-3">Not Found</div>;
};
const Layout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* homepage path="/" */}
        <Route path="/" element={<App></App>}>
          <Route index element={<HomePage></HomePage>} />
          <Route
            path="users"
            element={
              <PrivateRoute>
                <ListQuiz></ListQuiz>
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="/quiz/:id" element={<QuizDetails></QuizDetails>} />
        <Route
          path="/admins"
          element={
            <PrivateRoute>
              <Admin></Admin>
            </PrivateRoute>
          }
        >
          <Route index element={<DashBoard></DashBoard>} />
          <Route
            path="user-management"
            element={<UserManagement></UserManagement>}
          />
          <Route
            path="quiz-management"
            element={<QuizManagement></QuizManagement>}
          />
          <Route
            path="question-management"
            element={<QuestionManagement></QuestionManagement>}
          />
        </Route>
        <Route path="/login" element={<Login></Login>} />
        <Route path="/register" element={<Signin></Signin>} />
        <Route path="*" element={<NotFound></NotFound>} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Suspense>
  );
};

export default Layout;
