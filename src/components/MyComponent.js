//class components
//function components

import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <UserInfor></UserInfor>
        <hr />
        <DisplayInfor name="Louis" age={18}></DisplayInfor>
      </div>
    );
  }
}

export default MyComponent;
