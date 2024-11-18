import video from "../../assets/video-homepage.mp4";

const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={video} type="video/mp4"></source>
      </video>
    </div>
  );
};

export default HomePage;
