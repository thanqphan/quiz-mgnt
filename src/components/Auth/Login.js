import { useState } from "react";
import "./Login.scss";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert("Login");
  };
  return (
    <div className="login-container">
      <div className="login-header">Don't have an account yet?</div>
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
        <span className="forgot-password">Forgot your password?</span>
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
      </div>
    </div>
  );
};

export default Login;
