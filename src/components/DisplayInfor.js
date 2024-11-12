import React from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";

class DisplayInfor extends React.Component {
  state = {
    isDisplayable: true,
  };

  handleShowHideListEvent = () => {
    this.setState({ isDisplayable: !this.state.isDisplayable });
  };
  render() {
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
