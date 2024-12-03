import { useSelector } from "react-redux";
import video from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={video} type="video/mp4"></source>
      </video>
      <div className="homepage-content">
        <div className="homepage-title">
          Get to know your customers with forms worth filling out
        </div>
        <div className="homepage-desc">
          Collect all the data you need to understand customers with forms
          designed to be refreshingly different.
        </div>
        <div className="homepage-button">
          {isAuthenticated ? (
            <button
              onClick={() => {
                navigate("/users");
              }}
            >
              Doing a quiz
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Get started-it's free
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
