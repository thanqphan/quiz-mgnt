//class components
//function components

import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Thang", age: 22 },
      { id: 2, name: "Anh", age: 12 },
      { id: 3, name: "Phan", age: 32 },
      { id: 4, name: "Louis", age: 27 },
    ],
  };
  render() {
    return (
      <div>
        <UserInfor></UserInfor>
        <hr />
        <DisplayInfor listUsers={this.state.listUsers}></DisplayInfor>
      </div>
    );
  }
}

export default MyComponent;
