import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PiUploadSimple } from "react-icons/pi";

const ModelNewUser = () => {
  const [show, setShow] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUploadImage = (event) => {
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="model-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <div className="form-group col-md-6">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label className="form-label">Role</label>
                <select
                  id="inputRole"
                  className="form-control"
                  onChange={(event) => setRole(event.target.value)}
                >
                  <option value={"USER"}>User</option>
                  <option value={"ADMIN"}>Admin</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label
                  className="form-label label-upload"
                  htmlFor="uploadImage"
                >
                  <PiUploadSimple />
                  Upload File Image
                </label>
                <input
                  type="file"
                  hidden
                  id="uploadImage"
                  onChange={(event) => handleUploadImage(event)}
                ></input>
              </div>
              <div className="col-md-12 img-preview">
                {previewImage ? (
                  <img src={previewImage}></img>
                ) : (
                  <span>Preview Image</span>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelNewUser;
