import { IoEyeSharp } from "react-icons/io5";
import { BiEditAlt } from "react-icons/bi";
import { PiTrash } from "react-icons/pi";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

const UserTable = (props) => {
  const { listUsers, pageCount } = props;

  const handlePageClick = (event) => {
    props.fetchListUsersWithPaging(+event.selected + 1)
    props.setCurrentPage(+event.selected + 1)
   };

  return (
    <>
      <table className="table  table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Email</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={`data-user-table-${index}`}>
                  <th scope="row">{user.id}</th>
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-info"
                    onClick={()=>{props.handleClickBtnDetailsUser(user)}}>
                      <IoEyeSharp />
                    </button>
                    <button className="btn btn-warning mx-3"
                    onClick={()=>{props.handleClickBtnUpdateUser(user)}}
                    >
                      <BiEditAlt />
                    </button>
                    <button className="btn btn-danger"
                    onClick={()=>{props.handleClickBtnDeleteUser(user)}}>
                      <PiTrash />
                    </button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={"4"}>No Data Founds</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
      <ReactPaginate
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        //value = 1-> but this 0-> 
        forcePage={props.currentPage-1}
      />
      </div>
    </>
  );
};

export default UserTable;





























// const UserTable = (props) => {
//   const { listUsers } = props;

//   return (
//     <>
//       <table className="table  table-hover table-bordered">
//         <thead>
//           <tr>
//             <th scope="col">Id</th>
//             <th scope="col">Email</th>
//             <th scope="col">Username</th>
//             <th scope="col">Role</th>
//             <th scope="col">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {listUsers &&
//             listUsers.length > 0 &&
//             listUsers.map((user, index) => {
//               return (
//                 <tr key={`data-user-table-${index}`}>
//                   <th scope="row">{user.id}</th>
//                   <td>{user.email}</td>
//                   <td>{user.username}</td>
//                   <td>{user.role}</td>
//                   <td>
//                     <button className="btn btn-info"
//                     onClick={()=>{props.handleClickBtnDetailsUser(user)}}>
//                       <IoEyeSharp />
//                     </button>
//                     <button className="btn btn-warning mx-3"
//                     onClick={()=>{props.handleClickBtnUpdateUser(user)}}
//                     >
//                       <BiEditAlt />
//                     </button>
//                     <button className="btn btn-danger"
//                     onClick={()=>{props.handleClickBtnDeleteUser(user)}}>
//                       <PiTrash />
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           {listUsers && listUsers.length === 0 && (
//             <tr>
//               <td colSpan={"4"}>No Data Founds</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </>
//   );
// };

// export default UserTable;
