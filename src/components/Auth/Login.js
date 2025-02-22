import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiServices";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Language from "../Header/Language";
const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [delay, setDelay] = useState(3000);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setIsLoading(true);
    let data = await postLogin(email, password, delay);

    if (data && data.EC === 0) {
      dispatch(doLogin(data));
      toast.success(data.EM);
      setIsLoading(false);
      navigate("/");
    } else {
      toast.error(data.EM);
      setIsLoading(false);
    }
  };
  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };
  const handleBtnRegister = () => {
    navigate("/register");
  };
  const handleOnKeyDown = (event) => {
    //keyCode 13 means Enter key
    if (event && event.keyCode === 13) {
      handleLogin();
    }
  };
  return (
    <div className="login-container">
      <div className="login-header">
        <span>Don't have an account yet?</span>
        <button
          className="btn btn-sign-in"
          onClick={() => {
            handleBtnRegister();
          }}
        >
          Sign in
        </button>
        <Language />
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
            onKeyDown={(event) => {
              handleOnKeyDown(event);
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
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="loading-icon" />
            ) : null}
            <span>Log in</span>
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
