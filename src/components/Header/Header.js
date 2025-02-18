import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { postLogOut } from "../../services/apiServices";
import { toast } from "react-toastify";
import { doLogOut } from "../../redux/action/userAction";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user?.isAuthenticated);
  const account = useSelector((state) => state.user?.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <NavLink to="/" className="navbar-brand">
          React Bootstrap
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* =event.preventDefault */}
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              User
            </NavLink>
            <NavLink to="/admins" className="nav-link">
              Admin
            </NavLink>
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item>Profile</NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Log out
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
                  Log in
                </button>
                <button
                  className="btn btn-sign-up"
                  onClick={() => {
                    handleBtnRegister();
                  }}
                >
                  Register
                </button>
              </>
            )}
            <NavDropdown
              title="Việt Nam"
              id="basic-nav-dropdown"
              className="langues"
            >
              <NavDropdown.Item>English</NavDropdown.Item>
              <NavDropdown.Item>Việt Nam</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
