import { useNavigate } from "react-router-dom";
import "../pages/About.css";
import martaMap from "../images/marta-map.webp";
const About = () => {
    const navigate = useNavigate();
    return (
      <div className="aboutPage">
        <div className="aboutHeader">
          <button onClick={() => navigate("/")} className="back-btn">
            Back
          </button>
          <h1>ABOUT</h1>
        </div>
        <div className="aboutContent">
          <div className="map-image">
            <img src={martaMap} alt="marta map" className="martaMap" />
          </div>
          <div className="about">
            <p>
              MARTA train stations are the backbone of getting around metro
              Atlanta—clean, well-signed hubs where the Red, Gold, Blue, and
              Green lines converge with bus routes, shuttles, and rideshare
              zones. Platforms are accessible with elevators and escalators, and
              fare gates take reloadable Breeze Cards or contactless payments.
              Inside, you’ll usually find digital boards with next-train times,
              clear color-coded maps, and wayfinding to nearby streets,
              neighborhoods, and landmarks. Many stations sit right by key
              destinations—Downtown, Midtown, Buckhead—and the Airport station
              connects directly into Hartsfield-Jackson’s domestic terminal,
              making transfers from flight to rail painless. Peak hours bring
              frequent service, but even off-peak the trains are steady, and
              stations often include bike racks, artwork from local artists, and
              security presence to keep things moving smoothly.
            </p>
          </div>
        </div>
      </div>
    );
}

export default About;