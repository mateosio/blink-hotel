import "./rooms.scss";

export default function Rooms() {
  return (
    <>
      <section className="rooms__about__section">
        <div className="taketour_section-header-rect"></div>
        <div className="rooms__about__section-general">
          <div className="rooms__about__section-info">
            <h2>THE ULTIMATE LUXURY</h2>
            <h1>Ultimate Room</h1>
          </div>
          <div className="rooms__about__section-links">
            <a href="./" className="rooms-link-home">
              Home
            </a>
          </div>
        </div>
      </section>
      <section className="rooms__slider__section">
        <div className="rooms-slider-container">
          <div class="rooms-slider">
            <img src="{{$room['randomImage']}}" alt="room image" />
            <div className="rooms__section-amenities">//</div>
            <h3>{"room_type"}</h3>
            <p>{"description"}</p>
            <div className="rooms__grid-price">
              <span className='{{ $room["discount"] ? "price-low-number" : "price-number-small" }}'>
                $ {"discountedPrice"} /Night
              </span>
              <form action="../room-detail" method="GET">
                <input type="hidden" name="roomId" value="{'id'}" />
                <button type="submit">Booking Now</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
