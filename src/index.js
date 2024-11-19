import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./components/User/User";
import Admin from "./components/Admin/Admin";
import HomePage from "./components/Home/HomePage";
import UserManagement from "./components/Admin/Content/UserManage";
import DashBroad from "./components/Admin/Content/DashBroad";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
    {/* </React.StrictMode> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
