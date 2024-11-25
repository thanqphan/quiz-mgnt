import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast, ToastContainer } from "react-toastify";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    let data = await postLogin(email, password);

    if (data && data.EC === 0) {
      toast.success(data.EM);
    } else {
      toast.error(data.EM);
    }
  };
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };
  // const handleBackToHomePage = () => {
  //   navigate("/");
  // };
  return (
    <div className="login-container">
      <div className="login-header">
        <span>Don't have an account yet?</span>
        <button className="btn btn-sign-in">Sign in</button>
      </div>
      <div className="login-title col-4 mx-auto">React tutorial</div>
      <div className="login-welcome col-4 mx-auto">Hi! Who's this DIVA?</div>
      <div className="login-content-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
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
        <div className="form-group">
          <label>Password</label>
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
        <span
          className="forgot-password"
          onClick={() => {
            handleForgotPassword();
          }}
        >
          Forgot your password?
        </span>
        <div>
          <button
            className="btn btn-submit justify-content-center"
            onClick={() => {
              handleLogin();
            }}
          >
            Log in
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

export default Login;
