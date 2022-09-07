// khai báo component
import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { useEffect } from "react";
import { getAllUsers } from "../../../services/apiService";
import { useState } from "react";
import ModalUpdateUser from "./ModalUpdateUser";

// ManagerUser là thằng cha quản lý data Table và ModalCreateUser

const ManageUser = (props) => {
  // setShowModalCreateUser là tham số thứ 2 của State, giúp cập nhật thằng State, gọi tắt luôn

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState[{}];
  const [listUsers, setListUsers] = useState([]);

  // sau khi có DOM mới gọi API fetchListUsers, có data rồi thì cập nhật lại setListUsers
  // lúc đó giao diện tự động render lại

  //   useEffect sẽ chạy sau khi return chạy, đảm bảo tránh các lỗi tối đa nhất có thể
  // viết useEffect truyền cho nó arrow function và mảng rỗng [] là componentDidMount, nó sẽ chạy 1 lần
  // sau lần return đầu tiên nó sẽ chạy vào useEffect
  // sau khi biết có phần DOM ở dưới rồi mới tiếp tục thao tác vs nó
  //   ko viết async await bên trong useEffect, vì bản chất nó muốn chạy từng dòng code, ko muốn ảnh hưởng đến quá trình
  // chạy code sau này
  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    // sẽ check EC trong Console nếu =0 thì sẽ in ra đc DT data
    if (res.EC === 0) {
      // gọi ra hàm này để nó cập nhật listUsers ở trên
      setListUsers(res.DT);
    }
  };

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-users-container ">
          <TableUser
            listUsers={listUsers}
            // hàm cập nhật lại ModalUpdate
            handleClickBtnUpdate={handleClickBtnUpdate}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          // cập nhật lại biến
          setShow={setShowModalUpdateUser}
          dataUpdate={dataUpdate}
        />
        {/* tableuser và modalCreateUser cùng cấp vs nhau nên phải đưa cho thằng cha quản lý */}
      </div>
    </div>
  );
};
export default ManageUser;
