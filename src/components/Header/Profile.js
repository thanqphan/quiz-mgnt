import { useState } from "react";
import { Modal } from "react-bootstrap";
import UserInfor from "./UserInfor";
import UserQuizHistory from "./UserQuizHistory";
import ChangePassword from "./ChangePassword";
import "./Profile.scss";

const Profile = (props) => {
  const { show, setShow } = props;
  const [activeTab, setActiveTab] = useState("user-info");

  const renderContent = () => {
    switch (activeTab) {
      case "user-info":
        return <UserInfor />;
      case "change-password":
        return <ChangePassword />;
      case "quiz-history":
        return <UserQuizHistory />;
      default:
        return <UserInfor />;
    }
  };

  const handleClose = () => {
    setShow(false);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-profile"
      >
        <Modal.Header closeButton>
          <Modal.Title>User Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "user-info" ? "active" : ""
                }`}
                onClick={() => setActiveTab("user-info")}
              >
                User Information
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "change-password" ? "active" : ""
                }`}
                onClick={() => setActiveTab("change-password")}
              >
                Change Password
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "quiz-history" ? "active" : ""
                }`}
                onClick={() => setActiveTab("quiz-history")}
              >
                Quiz History
              </button>
            </li>
          </ul>{" "}
          <div className="mt-3">{renderContent()}</div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Profile;
