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

  handleOnSubmitEvent = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  handleOnChangeEvent = (event) => {
    console.log(event.target.value);
    this.setState({
      name: event.target.value,
    });
  };
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age} years old.
        <form onSubmit={(event) => this.handleOnSubmitEvent(event)}>
          <input
            onChange={(event) => this.handleOnChangeEvent(event)}
            type="text"
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default MyComponent;
