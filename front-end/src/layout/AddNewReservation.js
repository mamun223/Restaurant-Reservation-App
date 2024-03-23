

import React, { useState } from "react";
import ReservationNew from "./ReservationNew";
import createReservation from "../utils/api";
import { useHistory } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";

function AddNewReservation({ setSelectedDate }) {
  const history = useHistory();

  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });

  const [error, setError] = useState(null);
  // const [key, setKey] = useState(1); // Initialize key state

  const handleSubmit = () => {
    const abortController = new AbortController();

    createReservation({ data: reservation }, abortController.signal)
      .then((reservation) => {
        setReservation(reservation);
        history.push("/dashboard");
      })
      .catch((error) => {
        setError(error);
        // Force re-render by updating the key state
      })
      .finally(() => {
        abortController.abort();
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReservation({ ...reservation, [name]: value });
    setSelectedDate(reservation.reservation_date);
  };

  const handleCancel = () => {
    history.push("/dashboard");
  };

  return (
    <div>
      <ErrorAlert error={error} />
      <ReservationNew
        reservation={reservation}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        handleChange={handleChange}
      />
    </div>
  );
}

export default AddNewReservation;
