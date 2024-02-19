import { useState } from "react";
import "./arrival.scss";

export default function Arrival(){
    const [arrivalDate, setArrivalDate] = useState(getFormattedDate(new Date()));
    const [departureDate, setDepartureDate] = useState(getFormattedDate(new Date(new Date().getTime() + 86400000))); // +1 día en milisegundos

    function getFormattedDate(date) {
        const year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
            
        }
        if (day < 10) {
            day = '0' + day;
        }
         
        return `${year}-${month}-${day}`;
    };

    const handleGetPhotos = ()=>{
        e.preventDefault();
    }


    return(
    <section className="schedule__section">
             <form onSubmit={handleGetPhotos}>
            <div className="schedule__section-calendar">
                <div className="input__container__arrival">
                    <label htmlFor="date">Arrival date</label>
                    <input type="date" value={arrivalDate} min={getFormattedDate(new Date())} max={getFormattedDate(new Date(new Date().getTime() + 31536000000))} name="availdatein" onChange={(e) => setArrivalDate(e.target.value)} className="input__container__arrival-date-input input-calendar"/>
                </div>
                <div className="input__container__departure">
                    <label htmlFor="date-departure">Departure date</label>
                    <input type="date" id="date-departure" value={departureDate} min={getFormattedDate(new Date(new Date().getTime() + 86400000))} max={getFormattedDate(new Date(new Date().getTime() + 31536000000))} name="availdateout" onChange={(e) => setDepartureDate(e.target.value)} className="input-calendar"/>
                </div>
            </div>
            <div className="schedule__section-button">
                <button type="submit">CHECK AVAILABILITY</button>
            </div>
        </form>
        </section>
    )
    };