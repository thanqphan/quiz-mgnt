import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const account = useSelector((state) => state.user.account);
  const navigate = useNavigate();

  const handleBtnLogin = () => {
    navigate("/login");
  };
  const handleBtnRegister = () => {
    navigate("/register");
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
                <NavDropdown.Item>Log out</NavDropdown.Item>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
