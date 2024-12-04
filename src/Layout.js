import App from "./App";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import UserManagement from "./components/Admin/Content/UserManagement";
import DashBroad from "./components/Admin/Content/DashBroad";
import Login from "./components/Auth/Login";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./components/Auth/Register";
import ListQuiz from "./components/User/ListQuiz";
import QuizDetails from "./components/User/QuizDetails";

const NotFound = () => {
  return <div className="alert alert-danger container m-3">Not Found</div>;
};
const Layout = () => {
  return (
    <>
      <Routes>
        {/* homepage path="/" */}
        <Route path="/" element={<App></App>}>
          <Route index element={<HomePage></HomePage>} />
          <Route path="users" element={<ListQuiz></ListQuiz>} />
        </Route>
        <Route path="/quiz/:id" element={<QuizDetails></QuizDetails>} />
        <Route path="/admins" element={<Admin></Admin>}>
          <Route index element={<DashBroad></DashBroad>} />
          <Route
            path="user-management"
            element={<UserManagement></UserManagement>}
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
    </>
  );
};

export default Layout;
