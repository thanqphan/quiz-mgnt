import React from "react";

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
      <div>
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
          <div>
            {listUsers.map((user) => {
              return (
                <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                  <div>My name is {user.name}</div>
                  <div>My age is {user.age}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DisplayInfor;
