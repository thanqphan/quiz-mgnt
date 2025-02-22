import { useState } from "react";
import { Button } from "react-bootstrap";
import { postChangePassword, postLogOut } from "../../services/apiServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogOut } from "../../redux/action/userAction";

const ChangePassword = (props) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const account = useSelector((state) => state.user?.account);
  console.log(account);

  const validateForm = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return false;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return false;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Confirm password does not match new password.");
      return false;
    }
    if (currentPassword === newPassword) {
      toast.error("New password cannot be the same as the current password.");
      return false;
    }
    return true;
  };
  const handleLogout = async () => {
    let res = await postLogOut(account.email, account.refresh_token);
    if (res && res.EC === 0) {
      //clear data of redux
      dispatch(doLogOut());
      navigate("/login");
    } else {
      toast.error(res.EM);
    }
  };
  const handleChangePassword = async () => {
    if (!validateForm()) return;

    let res = await postChangePassword(currentPassword, newPassword);
    if (res && res.EC === 0) {
      toast.success(res.EM);

      handleLogout();
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <>
      <form>
        <div className="form-row d-flex ">
          <div className="form-group col-md-6 me-2">
            <label className="form-label">Current password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Curent password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">New password</label>
            <input
              type="password"
              className="form-control"
              placeholder="New password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>
        </div>
        <div className="form-row mt-2">
          <div className="form-group col-md-6">
            <label className="form-label">Confirm password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
        </div>
      </form>
      <Button className="mt-3" variant="primary" onClick={handleChangePassword}>
        Save New Password
      </Button>
    </>
  );
};
export default ChangePassword;
