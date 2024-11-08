//class components
//function components

import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Thang",
    age: 22,
    address: "Thu Duc",
  };

  handleOnClickEvent(event) {
    alert("Button clicked");
  }

  handleOnMouseOverEvent(event) {
    console.log("Over here...");
  }

  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age} years old.
        <div>
          <button onClick={this.handleOnClickEvent}>Click</button>
          <button onMouseOver={this.handleOnMouseOverEvent}>MouseOver</button>
        </div>
      </div>
    );
  }
}

export default MyComponent;
