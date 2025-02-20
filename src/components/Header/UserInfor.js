import { useEffect, useState } from "react";
import { postUpdateProfile } from "../../services/apiServices";
import { toast } from "react-toastify";
import { PiUploadSimple } from "react-icons/pi";
import { Button } from "react-bootstrap";

const UserInfor = (props) => {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");

  const [previewImage, setPreviewImage] = useState("");
  const [reloadUser, setReloadUser] = useState(false);

  useEffect(() => {
    const parsedRoot = JSON.parse(localStorage.getItem("persist:root"));
    const storedUser = JSON.parse(parsedRoot.user);
    console.log(storedUser);
    if (storedUser && storedUser.account) {
      setUsername(storedUser.account.username || "");
      setEmail(storedUser.account.email || "");
      setRole(storedUser.account.role || "USER");
      if (storedUser.account.image) {
        setImage(storedUser.account.image);
        setPreviewImage(`data:image/jpeg;base64,${storedUser.account.image}`);
      }
    }
  }, [reloadUser]);

  const handleUploadImage = (event) => {
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleUpdateUserInformation = async () => {
    let base64Image = image;
    if (image && typeof image !== "string") {
      base64Image = await convertToBase64(image);
    }
    let data = await postUpdateProfile(username, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);

      const parsedRoot = JSON.parse(localStorage.getItem("persist:root"));
      const storedUser = JSON.parse(parsedRoot.user);
      storedUser.account.username = username;
      if (base64Image) {
        storedUser.account.image = base64Image.replace(
          /^data:image\/\w+;base64,/,
          ""
        );
      }
      parsedRoot.user = JSON.stringify(storedUser);
      localStorage.setItem("persist:root", JSON.stringify(parsedRoot));
      setPreviewImage(`data:image/jpeg;base64,${storedUser.account.image}`);

      setReloadUser(!reloadUser);
    } else {
      toast.error(data.EM);
    }
  };
  return (
    <>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              disabled
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label className="form-label">Role</label>
            <select
              id="inputRole"
              className="form-control"
              onChange={(event) => setRole(event.target.value)}
              disabled
            >
              <option value={"USER"}>User</option>
              <option value={"ADMIN"}>Admin</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-12">
            <label className="form-label label-upload" htmlFor="uploadImage">
              <PiUploadSimple />
              Upload File Image
            </label>
            <input
              type="file"
              hidden
              id="uploadImage"
              onChange={(event) => handleUploadImage(event)}
            ></input>
          </div>
          <div className="col-md-12 img-preview">
            {previewImage ? (
              <img src={previewImage}></img>
            ) : (
              <span>Preview Image</span>
            )}
          </div>
        </div>
      </form>
      <Button variant="primary" onClick={handleUpdateUserInformation}>
        Save Changes
      </Button>
    </>
  );
};
export default UserInfor;
