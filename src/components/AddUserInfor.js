import React from "react";

class AddUserInfor extends React.Component {
  state = {
    name: "",
    age: 22,
    address: "Thu Duc",
  };

  handleOnSubmitEvent = (event) => {
    event.preventDefault();
    this.props.handleAddUserEvent({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: this.state.name,
      age: this.state.age,
    });
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

export default AddUserInfor;
