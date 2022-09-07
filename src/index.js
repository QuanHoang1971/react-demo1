import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
// điều hướng trang
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import User from "./components/User/User";
import HomePage from "./components/Home/HomePage";
import ManageUser from "./components/Admin/Content/ManageUser";
import DashBoard from "./components/Admin/Content/DashBoard";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            {/* HomePage trùng vs path "/" thằng cha rồi nên ko cần path */}
            <Route index element={<HomePage />} />
            <Route path="users" element={<User />} />
          </Route>
          {/* admin thành Route cha */}
          <Route path="admins" element={<Admin />}>
            {/* mặc định trong admin sẽ render ra thằng DashBoard */}
            <Route index element={<DashBoard />} />
            {/* route con gọi đến ManageUser */}
            <Route path="manage-users" element={<ManageUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
// path "/" là thằng cha đang code vào trang Home, render sang App, luôn chạy đầu tiên
// bên trong admins, users phải chỉ ra muốn render ở đâu. Chỉ ra muốn render bên trong app-content bên App.js
// định nghĩa component rồi truyền vào trong thư viện
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
