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

const Layout = () => {
  return (
    <>
      <Routes>
        {/* homepage path="/" */}
        <Route path="/" element={<App></App>}>
          <Route index element={<HomePage></HomePage>} />
          <Route path="users" element={<User></User>} />
        </Route>
        <Route path="/admins" element={<Admin></Admin>}>
          <Route index element={<DashBroad></DashBroad>} />
          <Route
            path="user-management"
            element={<UserManagement></UserManagement>}
          />
        </Route>
        <Route path="/login" element={<Login></Login>} />
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
