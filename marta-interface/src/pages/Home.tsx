import "../pages/Home.css";
import martaImg from "../images/marta.jpeg";

const Home = () => {
    return (
      <div className="homePage">
        <div className="header">
          <h1>MARTA</h1>
          <button className="about-btn">About MARTA</button>
        </div>
        <div className="homeContent">
          <div className="leftSide">
            <h3>VIEW ROUTES SCHEDULE</h3>
            <div className="routes">
              <button style={{ backgroundColor: "#FFD700", color: "#000" }}>
                Gold Line
              </button>
              <button style={{ backgroundColor: "#C8102E", color: "#fff" }}>
                Red Line
              </button>
              <button style={{ backgroundColor: "#0B6E4F", color: "#fff" }}>
                Green Line
              </button>
              <button style={{ backgroundColor: "#005BBB", color: "#fff" }}>
                Blue Line
              </button>
            </div>
          </div>
          <img src={martaImg} alt="marta train" className="marta"/>
        </div>
      </div>
    );
}

export default Home;