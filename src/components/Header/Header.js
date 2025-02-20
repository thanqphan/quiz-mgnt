import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { postLogOut } from "../../services/apiServices";
import { toast } from "react-toastify";
import { doLogOut } from "../../redux/action/userAction";
import Language from "./Language";
import { useTranslation } from "react-i18next";
import Profile from "./Profile";
import { useState } from "react";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const account = useSelector((state) => state.user?.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleBtnLogin = () => {
    navigate("/login");
  };
  const handleBtnRegister = () => {
    navigate("/register");
  };
  const handleLogout = async () => {
    let res = await postLogOut(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      //clear data of redux
      dispatch(doLogOut());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
          <NavLink to="/" className="navbar-brand">
            React Tutorial
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* =event.preventDefault */}
              <NavLink to="/" className="nav-link">
                {t("header.home")}
              </NavLink>
              <NavLink to="/users" className="nav-link">
                {t("header.user")}
              </NavLink>
              <NavLink to="/admins" className="nav-link">
                {t("header.admin")}
              </NavLink>
            </Nav>
            <Nav>
              {isAuthenticated ? (
                <NavDropdown
                  title={t("header.setting")}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    onClick={() => {
                      setShowUserProfile(true);
                    }}
                  >
                    {" "}
                    {t("header.profile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    {t("header.log-out")}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <button
                    className="btn btn-login"
                    onClick={() => {
                      handleBtnLogin();
                    }}
                  >
                    {t("header.login")}
                  </button>
                  <button
                    className="btn btn-sign-up"
                    onClick={() => {
                      handleBtnRegister();
                    }}
                  >
                    {t("header.register")}
                  </button>
                </>
              )}
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Profile show={showUserProfile} setShow={setShowUserProfile} />
    </>
  );
};

export default Header;
