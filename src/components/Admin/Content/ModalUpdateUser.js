// Modal React Bootstap
import React, { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../../services/apiService";
import _ from "lodash";

const ModalUpdateUser = (props) => {
  const { show, setShow, dataUpdate } = props;

  // setShow bản chất là true false, gọi đến thằng cha ManageUser, cập nhật lại State

  // reset lại Modal khi thoát ra ngoài
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreViewImage("");
  };

  // định nghĩa State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreViewImage] = useState("");

  // mỗi khi thay đổi user thì data sẽ thay đổi
  // nếu biến không rỗng thì phải làm j đấy -> update state
  // mỗi khi props thay đổi thì useEffect sẽ chạy nên giao diện React render lại
  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      setImage("");
      if (dataUpdate.image) {
        setPreViewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [props.dataUpdate]);

  const handleUpLoadImage = (event) => {
    // nếu upload ảnh thì mới hiện chữ PreviewImage, nếu ko có thì ko hiện
    if (event.target && event.target.files && event.target.files[0]) {
      setPreViewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
    }
    console.log("upload file", event.target.files[0]);
  };
  // validate email

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmitCreateUser = async () => {
    const isValidEmail = validateEmail(email);

    // nếu ko hợp lệ thì ko chạy data ở dưới
    if (!isValidEmail) {
      toast.error("invalid email");
      return;
    }
    if (!password) {
      toast.error("invalid password");
      return;
    }
    // vì  gửi file  lên server nên phải dùng FormData . form mẫu của axios

    // vì hành động axios gọi API tốn thgian nên cần dùng bất đồng bộ async await
    // khi có phản hồi phải console res.data. biến data của axios

    // hàm này chỉ gọi gián tiếp, sau đấy lấy phản hồi bên apiServices về
    // nvay code component ít hơn nhiều, thực tế làm nvay
    let data = await postCreateNewUser(email, password, username, role, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      // nếu thành công thì đóng Modal lại
      handleClose();
      await props.fetchListUsers();
      // từ đây gọi ngược lên thằng cha Manager, props là fetchListUsers cập nhật lại ở setListUsers(res.DT)
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
    }
  };
  // check ở Console nếu EC:0 là thành công error code

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      {/* backdrop để khi nào ấn vào dấu X mới thoát ra ngoài */}
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              {/* trong React thẻ input phải đóng tag, rule của React */}
              <input
                type="email"
                className="form-control"
                value={email}
                disabled={true}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                disabled={true}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                id="inputState"
                className="form-select"
                onChange={(event) => setRole(event.target.value)}
              >
                {/* phải truyền vào value vì nó là 1 option */}
                <option selected value="USER">
                  USERS
                </option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              {/* htmlFor sẽ ăn theo id của thẻ input */}
              <label className="form-label label-upload" htmlFor="labelupload">
                <FcPlus /> Upload File Image
              </label>
              <input
                type="file"
                id="labelupload"
                hidden
                onChange={(event) => handleUpLoadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preiew Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* phải gọi đến handleSubmitCreateUser ở trên khi click Save  */}
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// phải export mới dùng đc ở nơi khác
export default ModalUpdateUser;
