import { useEffect, useState } from "react";
import ModalAddNewUser from "./ModalAddNewUser";
import "./UserManagement.scss";
import { CiCirclePlus } from "react-icons/ci";
import UserTable from "./UserTable";
import {
  getAllUsers,
  getAllUsersWithPaging,
} from "../../../services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalDetailsUser from "./ModalDetailsUser";
import ModalDeleteUser from "./ModalDeleteUser";

const UserManagement = (props) => {
  const LIMIT_USER = 5;
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalDetailsUser, setShowModalDetailsUser] = useState(false);
  const [showModalDeletesUser, setShowModalDeleteUser] = useState(false);
  //user being chosen to update
  const [selectedUserData, setselectedUserData] = useState({});
  const [listUsers, setListUsers] = useState();

  useEffect(() => {
    // fetchListUsers();
    fetchListUsersWithPaging(1);
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res && res.EC === 0) {
      setListUsers(res.DT);
    }
  };
  const fetchListUsersWithPaging = async (page) => {
    let res = await getAllUsersWithPaging(page, LIMIT_USER);
    if (res && res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleClickBtnUpdateUser = (user) => {
    setShowModalUpdateUser(true);
    setselectedUserData(user);
  };
  const handleClickBtnDetailsUser = (user) => {
    setShowModalDetailsUser(true);
    setselectedUserData(user);
  };
  const handleClickBtnDeleteUser = (user) => {
    setShowModalDeleteUser(true);
    setselectedUserData(user);
  };

  const resetselectedUserData = () => {
    setselectedUserData({});
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
          <UserTable
            listUsers={listUsers}
            handleClickBtnUpdateUser={handleClickBtnUpdateUser}
            handleClickBtnDetailsUser={handleClickBtnDetailsUser}
            handleClickBtnDeleteUser={handleClickBtnDeleteUser}
            fetchListUsersWithPaging={fetchListUsersWithPaging}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalAddNewUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsersWithPaging}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          selectedUserData={selectedUserData}
          fetchListUsers={fetchListUsersWithPaging}
          resetselectedUserData={resetselectedUserData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalDetailsUser
          show={showModalDetailsUser}
          setShow={setShowModalDetailsUser}
          selectedUserData={selectedUserData}
          fetchListUsers={fetchListUsersWithPaging}
          resetselectedUserData={resetselectedUserData}
        />
        <ModalDeleteUser
          show={showModalDeletesUser}
          setShow={setShowModalDeleteUser}
          selectedUserData={selectedUserData}
          fetchListUsers={fetchListUsersWithPaging}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default UserManagement;
