const TableUser = (props) => {
  // const listUsers=props.listUsers
  const { listUsers } = props;

  //   khi giao diện đã render rồi, sau khi return xảy ra thì gọi API fetchListUsers lấy danh sách user rồi chạy đến async
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <td>Action</td>
          </tr>
        </thead>
        {/* thay vì hard code thì dùng vòng lặp map() để lấy data vào table */}

        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.role}</td>
                  <td>
                    <butto className="btn btn-secondary">View</butto>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => props.handleClickBtnUpdate(item)}
                    >
                      Update
                    </button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr>
              <td colSpan={"4"}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

/* có 1 cột nên phải để nó bằng 4 cột còn lại */
/* index bắt đầu từ 0 nên nếu có 2 ptu thì số thứ tự là 1,2 */
// phải để key {index} để nó unique ko bị báo lỗi trùng key

export default TableUser;
