//class components
//function components

import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Thang",
    age: 22,
    address: "Thu Duc",
  };

  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age} years old.
      </div>
    );
  }
}

export default MyComponent;
