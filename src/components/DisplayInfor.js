import React from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";

class DisplayInfor extends React.Component {
  constructor(props) {
    console.log("call -> constructor");
    super(props);
    //babel compiler
    this.state = {
      isDisplayable: true,
    };
  }

  componentDidMount() {
    console.log("call -> componentDidMount");
    setTimeout(() => {
      document.title = "Did mount";
    }, 5000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(
      "call -> componentDidUpdate",
      this.props,
      prevProps,
      prevState,
      snapshot
    );
    //buộc so sánh giá trị cũ và mới
    if (this.props.listUsers !== prevProps.listUsers) {
      if (this.props.listUsers.length === 5) {
        alert("You have 5 users");
      }
    }
  }

  handleShowHideListEvent = () => {
    this.setState({ isDisplayable: !this.state.isDisplayable });
  };
  render() {
    console.log("call -> render");
    const { listUsers } = this.props;
    return (
      <div className="display-infor-container">
        <img src={logo} />
        <div>
          <button
            onClick={() => {
              this.handleShowHideListEvent();
            }}
          >
            {this.state.isDisplayable === true
              ? "Hide List users"
              : "Show List users"}
          </button>
        </div>
        {this.state.isDisplayable && (
          <>
            {listUsers.map((user) => {
              return (
                <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                  <div>My name is {user.name}</div>
                  <div>My age is {user.age}</div>
                  <button
                    onClick={() => {
                      this.props.handleDeleteUserEvent(user.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
}

export default DisplayInfor;
