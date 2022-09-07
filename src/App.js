// đây là nơi tổng hợp tất cả file JS

import "./App.scss";
import { Outlet, Link } from "react-router-dom";
// chú ý kí tự in hoa, in thường ở folder và file bên trong
import Header from "./components/Header/header";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content"></div>
        <Outlet />
        {/* lồng nhau giữa các routr nên chia sẻ đc phần dùng chung 
        khi render thì Outlet ko còn nữa, chỉ còn component user, admin
        Outlet chỉ là thằng bọc ngoài thôi, nhưng là tín hiệu để báo React router biết thằng con sẽ
        render ở đây. ko dùng component Outlet nhưng phải khai báo vào */}
      </div>
    </div>
  );
};
export default App;
