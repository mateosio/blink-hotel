import { Link } from "react-router-dom";
import "./detail.scss";

export default function Detail() {
  return (
    <>
      <section className="room__detail-about__section">
        <div className="taketour_section-header-rect"></div>
        <div className="room__detail-about__section-general">
          <div className="room__detail-about__section-info">
            <h2>THE ULTIMATE LUXURY</h2>
            <h1>Ultimate Room</h1>
          </div>
          <div className="room__detail-about__section-links">
            <Link to={"/"} className="room-detail-link-home">
              Home
            </Link>
          </div>
        </div>
      </section>
      <section className="room__detail-availability">
        <div className="room__detail-availability-container">
          <div className="room__detail-title-price-container">
            <div className="room__detail-title">
              <h1>"room_type"</h1>
              <h2>Luxury room_type</h2>
            </div>
            <div className="room__detail-price">
              <span className="discountedPrice"></span>
              <span className="discountedText">/Night</span>

              <span className="detail-price">$</span>
              <span className="detail-night">/Night</span>
            </div>
          </div>
          <div className="room__detail-image">
            <img src="/img/home/pic-slider1.jpg" alt="room image" />
          </div>
          <div className="room__detail-form-container">
            <h1>Check Availability</h1>
          </div>
        </div>
      </section>
    </>
  );
}
