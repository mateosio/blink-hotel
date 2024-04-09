import { Link, useParams } from "react-router-dom";
import "./roomDetail.scss";
import { useQuery } from "@tanstack/react-query";
import { getRoomDetail } from "../features/getRoomDetail.jsx";
import Calendar from "./Calendar.jsx";


export default function RoomDetail() {
  const { id } = useParams();
  //pasar el id a getRoomDetail

  const {isLoading, data: room, isError, error} = useQuery({
    queryKey: ["roomDetail"],
    queryFn: () => getRoomDetail(id),
  });


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
      {isLoading ? (
        <p>Loading</p>
      ) : isError ? (
        <p>Error al realizar la solicitud: {error.message}</p>
      ) : room &&
      <section className="room__detail-availability">
        <div className="room__detail-availability-container">
          <div className="room__detail-title-price-container">
            <div className="room__detail-title">
              <h1>{room?.type}</h1>
              <h2>Luxury {room?.type}</h2>
            </div>
            <div className="room__detail-price">
              <span className="detail-price">${room?.price}</span>
              <span className="detail-night">/Night</span>
            </div>
          </div>
          <div className="room__detail-image">
            <img src={`/images/rooms/${room?.img}.avif`} alt="room image" />
          </div>
          {room && <Calendar reservations={room.roomReservations} id={id} />}
          {/* Sacar estilos del h1 en archivo scss */}
          {/* <div className="room__detail-form-container">
            <h1>Reservar</h1>
          </div> */}
        </div>
      </section>
      }
    </>
  );
}
