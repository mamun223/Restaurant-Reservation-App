import ReservationNew from "./ReservationNew"
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getReservation, updateReservation } from "../utils/api";
import ErrorAlert from "./ErrorAlert";

function EditReservation () {
    const { reservation_id } = useParams();
    const [reservation, setReservation] = useState(null);
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
      getReservation(reservation_id)
      .then((data) => {
        setReservation(data)
      })
      .catch((error) => {
        setError(error)
      })
    }, [reservation_id])

    if (reservation && reservation.status === "booked"){
    console.log("reservation in edit: ",reservation)
        const handleSubmit = () => {
          const abortController = new AbortController();
      
          updateReservation(reservation, abortController.signal)
            .then((reservation) => {
              setReservation(reservation);
              history.push("/dashboard");
            })
            .catch((error) => {
              setError(error);
            })
            .finally(() => {
              abortController.abort();
            });
        };
        const handleChange = (event) => {
          const { name, value } = event.target;
          setReservation({ ...reservation, [name]: value });
          // setSelectedDate(reservation.reservation_date);
        };
      
        const handleCancel = () => {
          history.push("/dashboard");
        };

        return (
          <ReservationNew
          reservation={reservation}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          handleChange={handleChange}
        />
        )
    } 
      return (
        <ErrorAlert error={error} />
      )

    
}

export default EditReservation;
