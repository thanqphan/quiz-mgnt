import React from "react";

class UserInfor extends React.Component {
  state = {
    name: "Thang",
    age: 22,
    address: "Thu Duc",
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

  handleOnChangeAgeEvent = (event) => {
    console.log(event.target.value);
    this.setState({
      age: event.target.value,
    });
  };
  render() {
    return (
      <div>
        My name is {this.state.name} and I'm {this.state.age} years old.
        <form onSubmit={(event) => this.handleOnSubmitEvent(event)}>
          <label>Name:</label>
          <input
            onChange={(event) => this.handleOnChangeEvent(event)}
            type="text"
          />
          <label>Age:</label>
          <input
            onChange={(event) => this.handleOnChangeAgeEvent(event)}
            type="text"
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default UserInfor;
