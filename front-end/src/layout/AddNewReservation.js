import ReservationNew from "./ReservationNew";
import createReservation from "../utils/api";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function AddNewReservation() {
  const history = useHistory();

  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    description: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  const [error, setError] = useState(undefined);

  const handleSubmit = () => {
    history.push(`/dashboard/${reservation.reservation_date}`);
    // const abortController = new AbortController();
    // createReservation(reservation, abortController.signal)
    //   .then((reservation) => {
    //     setReservation(reservation);
    //     console.log("newly created reservation: ", reservation)
    //     date = reservation.reservation_date;
    //     history.push(`/dashboard/${date}`);
    //   })
    //   .catch((error) => {
    //     setError(error);
    //   });

    // return () => abortController.abort();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setReservation({ ...reservation, [name]: value });
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <ReservationNew
      reservation={reservation}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleChange={handleChange}
    />
  );
}

export default AddNewReservation;
