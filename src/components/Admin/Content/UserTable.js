import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiServices";
import { IoEyeSharp } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { PiTrash } from "react-icons/pi";

const UserTable = (props) => {
  const { listUsers } = props;

  return (
    <>
      <table className="table  table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={`data-user-table-${index}`}>
                  <th scope="row">{user.id}</th>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-info">
                      <IoEyeSharp />
                    </button>
                    <button className="btn btn-warning mx-3">
                      <BiEditAlt />
                    </button>
                    <button className="btn btn-danger">
                      <PiTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={"4"}>No Data Founds</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
