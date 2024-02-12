
import "./arrival.scss";

export default function Arrival(){
    return(
    <section className="schedule__section">
            <form action="../rooms-grid" method="GET">
                <div className="schedule__section-calendar">
                    <div className="input__container__arrival">
                        <label for="date">Arrival date</label>
                        <input type="date" value="{{ date('Y-m-d') }}" min="{{ date('Y-m-d') }}"
                            max="{{ date('Y-m-d', strtotime('+1 Year')) }}" name="availdatein"
                            className="input__container__arrival-date-input input-calendar"/>
                    </div>
                    <div className="input__container__departure">
                        <label for="date-departure">Departure date</label>
                        <input type="date" id="date-departure" value="{{ date('Y-m-d', strtotime('+1 day')) }}"
                            min="{{ date('Y-m-d', strtotime('+1 day')) }}" max="{{ date('Y-m-d', strtotime('+1 Year')) }}"
                            name="availdateout" className="input-calendar"/>
                    </div>
                </div>
                <div className="schedule__section-button">
                    <button type="submit">CHECK AVAILABILITY</button>
                </div>
            </form>
        </section>
    )
    };