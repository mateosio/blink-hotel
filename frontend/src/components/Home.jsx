import Arrival from "./Arrival.jsx";
import { Link } from "react-router-dom";
import "./home.scss";

export default function Home() {
  return (
    <>
      <section className="main">
        <div className="main__title">
          <p>THE ULTIMATE LUXURY EXPERIENCE</p>
          <h1>The Perfect Base For You</h1>
        </div>
        <div className="taketour__container">
          <Link to="/rooms" className="taketour__button">
            <span>TAKE A TOUR</span>
          </Link>
          <Link to="" className="learn__button">
            <span>LEARN MORE</span>
          </Link>
        </div>
      </section>
      <Arrival />
    </>
  );
}
