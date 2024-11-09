//class components
//function components

import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Thang",
    age: 22,
    address: "Thu Duc",
  };

  //set state
  handleOnClickEvent(event) {
    this.setState({
      name: "Anh Thang",
      age: Math.floor(Math.random() * 100 + 1),
    });
  }

  //thay đổi giá trị state thì dùng arrow func cả ở func vừa ở thẻ / tag
  handleOnMouseOverEvent = (event) => {
    console.log("My name is ", this.state.name);
  };

  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age} years old.
        <div>
          <button
            onClick={(event) => {
              this.handleOnClickEvent(event);
            }}
          >
            Click
          </button>
          <button onMouseOver={this.handleOnMouseOverEvent}>MouseOver</button>
        </div>
      </div>
    );
  }
}

export default MyComponent;
