import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../../services/apiServices";
import { toast } from "react-toastify";
import Language from "../Header/Language";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleRegister = async () => {
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }

    if (!password) {
      toast.error("Invalid password");
      return;
    }

    let data = await postRegister(email, username, password);

    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    } else {
      toast.error(data.EM);
    }
  };
  const handleBtnLogin = () => {
    navigate("/login");
  };
  return (
    <div className="login-container">
      <div className="login-header">
        <span>Already have an account?</span>
        <button
          className="btn btn-sign-in"
          onClick={() => {
            handleBtnLogin();
          }}
        >
          Log in
        </button>
        <Language />
      </div>
      <div className="login-title col-4 mx-auto">React tutorial</div>
      <div className="login-welcome col-4 mx-auto">
        Hi DIVA! Start your journey!!
      </div>
      <div className="login-content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email (*)</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></input>
        </div>
        <div className="form-group password-group">
          <label>Password (*)</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
        </div>
        <div>
          <button
            className="btn btn-submit justify-content-center"
            onClick={() => {
              handleRegister();
            }}
          >
            Create a new account
          </button>
        </div>
        <span
          className="forgot-password"
          onClick={() => {
            navigate("/");
          }}
        >
          Back to home page
        </span>
      </div>
    </div>
  );
};

export default Register;
