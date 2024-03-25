import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import "./rooms.scss";
import { getRooms } from "../features/getRooms";


export default function Rooms() {

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });
  
  const navigate = useNavigate()

  const handlerBooking = (e, roomId) => {
    e.preventDefault();
    navigate(`${roomId}`);
  }

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
            <Link to="/" className="rooms-link-home">
              Home
            </Link>
          </div>
        </div>
      </section>
      {isLoading ? (
        <p>Loading</p>
      ) : isError ? (
        <p>Error al realizar la solicitud: {error.message}</p>
      ) : (
        <section className="rooms__slider__section">
          <div className="rooms-slider-container">
              {data.map((room) => (
              <div class="rooms-slider" key={room._id}>
               <img src={`/images/rooms/${room.img}.avif`} alt="room image" />
                <div className="rooms__section-amenities">//</div>
                <h3>{room.type}</h3>
                <p>{room.description}</p>
                <div className="rooms__grid-price">
                  <span className='{{ $room["discount"] ? "price-low-number" : "price-number-small" }}'>
                    {`$${room.price}/Night`}
                  </span>
                  <form onSubmit={(e)=> handlerBooking(e, room._id)}>
                    <button type="submit">Booking Now</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
