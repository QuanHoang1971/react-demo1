// vì chỉ nhận 1 biến xuất ra từ axiosCustomize nên đặt tên import ntn cũng đc, vì
// nó hiểu chỉ nhận từ đường dẫn file này, giữ Ctrl + click vào axios mà link tới đường dẫn thì thành công

import axios from "../utils/axiosCustomize";

// tách code,
// logic từ bên ModalCreateUser của API để ở đây. sau muốn thêm ,sửa user thì vào đây
// ko cần mở component, code tối ưu hóa hơn
const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  //   gọi API ở đây, hàm này trả ra phản hồi
  //   nó sẽ cộng vs đường link bên axiosCustomize thành đường link hoàn chỉnh
  return axios.post("api/v1/participant", data);
};

// tạo ra 1 hàm để get data về bên TableUser
const getAllUsers = () => {
  return axios.get("api/v1/participant/all");
};
// axios.get để đổ data về Table

// export ở đây có dấu object {} thì khi import vào ModalCreateUser cũng phải có
export { postCreateNewUser, getAllUsers };
