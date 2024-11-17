import React, { useState } from "react";
import "./DisplayInfor.scss";
import logo from "./../logo.svg";

// class DisplayInfor extends React.Component {
//   render() {
//     console.log("call -> render");
//     const { listUsers } = this.props;
//     return (
//       <div className="display-infor-container">
//         {true && (
//           <>
//             {listUsers.map((user) => {
//               return (
//                 <div key={user.id} className={user.age > 18 ? "green" : "red"}>
//                   <div>My name is {user.name}</div>
//                   <div>My age is {user.age}</div>
//                   <button
//                     onClick={() => {
//                       this.props.handleDeleteUserEvent(user.id);
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               );
//             })}
//           </>
//         )}
//       </div>
//     );
//   }
// }

const DisplayInfor = (props) => {
  const { listUsers } = props;

  const [displayState, setDisplayState] = useState(true);

  const handleHideShowListUser = () => {
    setDisplayState(!displayState);
  };
  return (
    <div className="display-infor-container">
      <div>
        <button onClick={() => handleHideShowListUser()}>
          {displayState === true ? "Hide list users" : "Show list users"}
        </button>
      </div>
      {displayState && (
        <>
          {listUsers.map((user) => {
            return (
              <div key={user.id} className={user.age > 18 ? "green" : "red"}>
                <div>My name is {user.name}</div>
                <div>My age is {user.age}</div>
                <button
                  onClick={() => {
                    props.handleDeleteUserEvent(user.id);
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
};

export default DisplayInfor;
