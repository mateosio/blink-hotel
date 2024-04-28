import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth.jsx";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { Alert, Stack } from "@mui/material";
import { makeReservation } from "../features/makeReservation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "react-datepicker/dist/react-datepicker.css";
import "./calendar.scss";

export default function Calendar({ id, reservations }) {
  const [actualDay, setActualDay] = useState(new Date());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [disabledRanges, setDisabledRanges] = useState(reservations);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertRange, setShowAlertRange] = useState(false);
  const [showAlertBooking, setShowAlertBooking] = useState(false);
  const [showAlertErrorBooking, setShowAlertErrorBooking] = useState(false);

  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const queryClient = useQueryClient();
  console.log(reservations);
  console.log(disabledRanges);

  const addBookingMutation = useMutation({
    mutationFn: makeReservation,
    onSuccess: async () => {
      await queryClient.invalidateQueries("roomDetail");
      setShowAlertBooking(true);
      setTimeout(() => {
        setShowAlertBooking(false);
      }, 2000);
    },
    onError: async () => {
      setShowAlertErrorBooking(true);
      setTimeout(() => {
        setShowAlertErrorBooking(false);
      }, 2000);
    },
  });

  if (reservations != disabledRanges) {
    setDisabledRanges(reservations);
  }

  //Recibo como argumento el rango de fechas seleccionado en el calendario. Si en dicho rango no existen fechas deshabilitadas actualizo los state con la fecha de inicio y final del rango, en caso contrario no permito esta acción.
  const handleStartDateChange = (date) => {
    const [start, end] = date;

    setStartDate(start);
    setEndDate(end);

    const startDateCalendar = format(start, "yyyy-MM-dd");
    const endDateCalendar = format(end, "yyyy-MM-dd");

    const isWithinRange = disabledRanges.some((disable) => {
      const disableStartDate = format(disable.startDate, "yyyy-MM-dd");
      const disableEndDate = format(disable.endDate, "yyyy-MM-dd");

      return (
        startDateCalendar < disableStartDate && endDateCalendar > disableEndDate
      );
    });

    if (isWithinRange) {
      setEndDate(startDate);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  // Recibo como argumento cada una de las fechas que se renderiza en el calendario y lo comparo con las fechas de reserva existentes que traigo del backend (disabledRanges). En el caso que se encuentra dentro del rango el metodo some devuelve true y cambio la respuesta a false con "!" para que el calendario sepa que debe deshabilitar la fecha analizada.
  const isDateDisabled = (date) => {
    const dateCalendar = format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");

    return !disabledRanges.some((range) => {
      const startDateDisabled = format(
        range.startDate,
        "yyyy-MM-dd'T'HH:mm:ss'Z'"
      );
      const endDateDisabled = format(range.endDate, "yyyy-MM-dd'T'HH:mm:ss'Z'");
      console.log(range.startDate);
      console.log(endDateDisabled);
      return (
        dateCalendar >= startDateDisabled && dateCalendar <= endDateDisabled
      );
    });
  };

  //
  const handleReserve = () => {
    if (startDate === null) {
      setShowAlertRange(true);
      setTimeout(() => {
        setShowAlertRange(false);
      }, 2000);
    } else if (!auth.user) {
      navigate("/login", state = { pathname: location.pathname });
    } else {
      const startDateCalendar = format(startDate, "yyyy-MM-dd");
      const endDateCalendar = format(endDate, "yyyy-MM-dd");
      const changes = {
        startDate: startDateCalendar,
        endDate: endDateCalendar,
      };

      addBookingMutation.mutate({ id, changes });

      //Hago que en el calendario deje de estar seleccionado el rango.
      setStartDate(null);
      setEndDate(null);
    }
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
      <div className="room__container-button">
        <h1 className="room__button" onClick={handleReserve}>
          Reservar
        </h1>
      </div>

      {showAlert && (
        <Stack className="alert_container">
          <Alert
            sx={{ maxWidth: "100%", minWidth: "100%" }}
            severity="info"
            variant="filled"
          >
            The selected range has disabled dates
          </Alert>
        </Stack>
      )}
      {showAlertRange && (
        <Stack className="alert_container">
          <Alert
            sx={{ maxWidth: "100%", minWidth: "100%" }}
            severity="info"
            variant="filled"
          >
            You must select a date range to reserve
          </Alert>
        </Stack>
      )}
      {showAlertBooking && (
        <Stack className="alert_container">
          <Alert
            sx={{ maxWidth: "100%", minWidth: "100%" }}
            severity="success"
            variant="filled"
          >
            The reservation was made successfully
          </Alert>
        </Stack>
      )}
      {showAlertErrorBooking && (
        <Stack className="alert_container">
          <Alert
            sx={{ maxWidth: "100%", minWidth: "100%" }}
            severity="success"
            variant="filled"
          >
            The reservation has failed, try later please!
          </Alert>
        </Stack>
      )}
    </>
  );
}
