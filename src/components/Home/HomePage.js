import videoHomePage from "../../assets/video-homepage.mp4";
const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video autoplay="autoplay" muted loop>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title-1">There's a better way to ask</div>
        <div className="title-2">
          You don't want to make a boring form.
          <p>Create a typeform instead—and make everyone happy</p>
        </div>
        <div className="title-3">Get started - it's free</div>
      </div>
    </div>
  );
};
export default HomePage;

// bắt buộc phải muted vì đó là chính sách của Chrome lquan đến trải nghiệm ng dùng
