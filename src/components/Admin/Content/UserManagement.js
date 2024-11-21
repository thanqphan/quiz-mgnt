import { useEffect, useState } from "react";
import ModalAddNewUser from "./ModalAddNewUser";
import "./UserManagement.scss";
import { CiCirclePlus } from "react-icons/ci";
import UserTable from "./UserTable";
import { getAllUsers } from "../../../services/apiServices";

const UserManagement = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);

  const [listUsers, setListUsers] = useState();

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      setListUsers(res.DT);
    }
  };

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
          <UserTable listUsers={listUsers} />
        </div>
        <ModalAddNewUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
        />
      </div>
    </div>
  );
};

export default UserManagement;
