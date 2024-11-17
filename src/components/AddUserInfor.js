import React, { useState } from "react";

// class AddUserInfor extends React.Component {
//   state = {
//     name: "",
//     age: 22,
//     address: "Thu Duc",
//   };

//   handleOnSubmitEvent = (event) => {
//     event.preventDefault();
//     this.props.handleAddUserEvent({
//       id: Math.floor(Math.random() * 100 + 1) + "-random",
//       name: this.state.name,
//       age: this.state.age,
//     });
//   };
//   handleOnChangeEvent = (event) => {
//     console.log(event.target.value);
//     this.setState({
//       name: event.target.value,
//     });
//   };

//   handleOnChangeAgeEvent = (event) => {
//     console.log(event.target.value);
//     this.setState({
//       age: event.target.value,
//     });
//   };
//   render() {
//     return (
//       <div>
//         My name is {this.state.name} and I'm {this.state.age} years old.
//         <form onSubmit={(event) => this.handleOnSubmitEvent(event)}>
//           <label>Name:</label>
//           <input
//             onChange={(event) => this.handleOnChangeEvent(event)}
//             type="text"
//           />
//           <label>Age:</label>
//           <input
//             onChange={(event) => this.handleOnChangeAgeEvent(event)}
//             type="text"
//           />
//           <button>Submit</button>
//         </form>
//       </div>
//     );
//   }
// }

const AddUserInfor = (props) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("Thu Duc");

  const handleOnSubmitEvent = (event) => {
    event.preventDefault();
    props.handleAddUserEvent({
      id: Math.floor(Math.random() * 100 + 1) + "-random",
      name: name,
      age: age,
    });
  };
  const handleOnChangeEvent = (event) => {
    setName(event.target.value);
  };

  const handleOnChangeAgeEvent = (event) => {
    setAge(event.target.value);
  };
  return (
    <div>
      My name is {name} and I'm {age} years old.
      <form onSubmit={(event) => handleOnSubmitEvent(event)}>
        <label>Name:</label>
        <input onChange={(event) => handleOnChangeEvent(event)} type="text" />
        <label>Age:</label>
        <input
          onChange={(event) => handleOnChangeAgeEvent(event)}
          type="text"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddUserInfor;
