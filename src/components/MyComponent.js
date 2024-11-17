//class components
//function components

import React, { useState } from "react";
import AddUserInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

// class MyComponent extends React.Component {
//   state = {
//     listUsers: [
//       { id: 1, name: "Thang", age: 22 },
//       { id: 2, name: "Anh", age: 12 },
//       { id: 3, name: "Phan", age: 32 },
//       { id: 4, name: "Louis", age: 27 },
//     ],
//   };

//   handleAddUserEvent = (object) => {
//     this.setState((this.state.listUsers = [object, ...this.state.listUsers]));
//   };

//   handleDeleteUserEvent = (userId) => {
//     let listUsersCLone = this.state.listUsers;
//     listUsersCLone = listUsersCLone.filter((user) => user.id !== userId);
//     this.setState({ listUsers: listUsersCLone });
//   };
//   render() {
//     return (
//       <div>
//         <AddUserInfor
//           handleAddUserEvent={this.handleAddUserEvent}
//         ></AddUserInfor>
//         <hr />
//         <DisplayInfor
//           listUsers={this.state.listUsers}
//           handleDeleteUserEvent={this.handleDeleteUserEvent}
//         ></DisplayInfor>
//       </div>
//     );
//   }
// }

const MyComponent = (props) => {
  const [listUsersState, setListUsersState] = useState([
    { id: 1, name: "Thang", age: 22 },
    { id: 2, name: "Anh", age: 12 },
    { id: 3, name: "Phan", age: 32 },
    { id: 4, name: "Louis", age: 27 },
  ]);

  const handleAddUserEvent = (object) => {
    setListUsersState([object, ...listUsersState]);
  };

  const handleDeleteUserEvent = (userId) => {
    let listUsersCLone = listUsersState;
    listUsersCLone = listUsersCLone.filter((user) => user.id !== userId);
    setListUsersState({ listUsersCLone });
  };

  return (
    <div>
      <AddUserInfor handleAddUserEvent={handleAddUserEvent}></AddUserInfor>
      <hr />
      <DisplayInfor
        listUsers={listUsersState}
        handleDeleteUserEvent={handleDeleteUserEvent}
      ></DisplayInfor>
    </div>
  );
};

export default MyComponent;
