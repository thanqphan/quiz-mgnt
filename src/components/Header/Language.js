import { NavDropdown } from "react-bootstrap";

const Language = (props) => {
  return (
    <>
      <NavDropdown title="Việt Nam" id="basic-nav-dropdown" className="langues">
        <NavDropdown.Item>English</NavDropdown.Item>
        <NavDropdown.Item>Việt Nam</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

export default Language;
