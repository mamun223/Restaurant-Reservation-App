// import ReservationNew from "./ReservationNew";
// import createReservation from "../utils/api";
// import { useState } from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { today } from "../utils/date-time";

// function AddNewReservation({ setSelectedDate }) {
//   const history = useHistory();

//   const [reservation, setReservation] = useState({ 
//     first_name: "",
//     last_name: "",
//     mobile_number: "",
//     reservation_date: "",
//     reservation_time: "",
//     people: "",
//   });
//   const [error, setError] = useState(undefined);

//   const handleSubmit = () => {
//     const abortController = new AbortController();
//     createReservation({ data: reservation }, abortController.signal)
//       .then((reservation) => {
//         setReservation(reservation);
//         history.push(`/dashboard`)
//       })
//       .catch(() => {
//         setError(error);
//       });
  
//     return () => abortController.abort();
//   };
  
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setReservation({ ...reservation, [name]: value });
//     setSelectedDate(reservation.reservation_date)
//   };

//   const handleCancel = () => {
//     history.push("/");
//   };

//   return (
//     <ReservationNew
//       reservation={reservation}
//       handleSubmit={handleSubmit}
//       handleCancel={handleCancel}
//       handleChange={handleChange}
//     />
//   );
// }

// export default AddNewReservation;


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
  const [error, setError] = useState(null); // Initialize error state

  const handleSubmit = () => {
    const abortController = new AbortController();


    createReservation({ data: reservation }, abortController.signal)
      .then((reservation) => {
        setReservation(reservation);
        history.push(`/dashboard`);
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
    setSelectedDate(reservation.reservation_date);
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div>
      <ErrorAlert error={error} /> {/* Display the error message */}
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
