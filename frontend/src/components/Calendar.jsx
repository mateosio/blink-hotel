import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.scss";

export default function Calendar({ reservations }) {
  const [actualDay, setActualDay] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  console.log(reservations);
  const [disabledRanges, setDisabledRanges] = useState(reservations);
  const [highlightedDate, setHighlightedDate] = useState(null);

  const handleStartDateChange = (date) => {
    const [start, end] = date;
    setStartDate(start);
    setEndDate(end);
  };

 
  // Compruebo si la fecha del calendario que recibo como argumento está dentro de uno de los rangos de fechas deshabilitadas.
  const isDateDisabled = (date) => {
    const dateFormat = format(date, "yyyy-MM-dd");
    
    return !disabledRanges.some((range) => {
      const startDateFormat = format(range.startDate, "yyyy-MM-dd");
      const endDateFormat = format(range.endDate, "yyyy-MM-dd");

     return dateFormat >= startDateFormat && dateFormat <= endDateFormat;
      
    });
  };

  return (
    <>
      <div>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          startDate={startDate}
          endDate={endDate}
          filterDate={isDateDisabled}
          inline
          minDate={new Date()}
          maxDate={
            new Date(
              actualDay.getFullYear() + 1,
              actualDay.getMonth(),
              actualDay.getDate()
            )
          }
          selectsRange
          
        />
      </div>
      <div className="room__detail-form-container">
        <h1>Reservar</h1>
      </div>
    </>
  );
}
