import "../pages/Home.css";
import { useNavigate } from "react-router-dom";
import martaImg from "../images/marta.jpeg";
import arrow from "../images/arrow.png";

const Home = () => {
    const navigate = useNavigate();
    return (
      <div className="homePage">
        <div className="header">
          <h1>MARTA</h1>
          <button onClick={() => navigate("/about")} className="about-btn">
            About MARTA
          </button>
        </div>
        <div className="homeContent">
          <div className="leftSide">
            <h3>VIEW ROUTES SCHEDULE</h3>
            <div className="routes">
              <button
                onClick={() => navigate("/lines", { state: { line: "gold" } })}
                style={{ backgroundColor: "#f1d012", color: "#000" }}
              >
                Gold Line
                <img src={arrow} alt="white arrow" className="arrow" />
              </button>

              <button
                onClick={() => navigate("/lines", { state: { line: "red" } })}
                style={{ backgroundColor: "#C8102E", color: "#fff" }}
              >
                Red Line
                <img src={arrow} alt="white arrow" className="arrow" />
              </button>
              <button
                onClick={() => navigate("/lines", { state: { line: "green" } })}
                style={{ backgroundColor: "#0B6E4F", color: "#fff" }}
              >
                Green Line
                <img src={arrow} alt="white arrow" className="arrow" />
              </button>
              <button
                onClick={() => navigate("/lines", { state: { line: "blue" } })}
                style={{ backgroundColor: "#005BBB", color: "#fff" }}
              >
                Blue Line
                <img src={arrow} alt="white arrow" className="arrow" />
              </button>
            </div>
          </div>
          <img src={martaImg} alt="marta train" className="marta" />
        </div>
      </div>
    );
}

export default Home;