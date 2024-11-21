import { useState } from "react";
import ModalAddNewUser from "./ModalAddNewUser";
import "./UserManagement.scss";
import { CiCirclePlus } from "react-icons/ci";
import UserTable from "./UserTable";

const UserManagement = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  return (
    <div className="user-management-container">
      <div className="title">User management</div>
      <div className="user-management-content">
        <div>
          <button
            className="btn btn-success btn-add-user"
            onClick={() => {
              setShowModalCreateUser(true);
            }}
          >
            <CiCirclePlus />
            Add New User
          </button>
        </div>
        <div className="tbl-users-container">
          <UserTable />
        </div>
        <ModalAddNewUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
        />
      </div>
    </div>
  );
};

export default UserManagement;
