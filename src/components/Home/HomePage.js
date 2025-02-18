import { useSelector } from "react-redux";
import video from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={video} type="video/mp4"></source>
      </video>
      <div className="homepage-content">
        <div className="homepage-title">{t("homepage.title")}</div>
        <div className="homepage-desc">{t("homepage.desc")}</div>
        <div className="homepage-button">
          {isAuthenticated ? (
            <button
              onClick={() => {
                navigate("/users");
              }}
            >
              {t("homepage.startbtn")}
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              {t("homepage.loginbtn")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
