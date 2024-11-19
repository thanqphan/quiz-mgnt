import ModelAddNewUser from "./ModelAddNewUser";

const UserManagement = (props) => {
  return (
    <div className="user-management-container">
      <div className="title">User management</div>
      <div className="user-management-content">
        <div>
          <button className="btn btn-primary">Add New User</button>
        </div>
        <div>Table content</div>
        <ModelAddNewUser />
      </div>
    </div>
  );
};

export default UserManagement;
