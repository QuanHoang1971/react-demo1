import axios from "axios";

// lấy thông số trong axios npm. sau này muốn gắn token vào header thì mới giữ lai. h xóa đi
const instance = axios.create({
  baseURL: "http://localhost:8081/",
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // check phản hồi , nếu phản hồi từ phía server có data này thì nhận response.data,
    // nếu ko thì để nguyên
    return response && response.data ? response.data : response;
    // thằng interceptor trước khi nhận đc data về nó đã can thiệp rồi
    // ở phía trình duyệt thằng postman đã mặc định lấy response.data về
    // nhưng ở phía Console cho ra loạt data, lúc này interceptor can thiệp để lấy data gọn gàng hơn
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response
      ? error.response
      : Promise.reject(error);
  }
);

// export default ntn nghĩa là sẽ chỉ xuất ra 1 biến thôi
export default instance;
