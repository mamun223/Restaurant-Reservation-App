
// function SeatButton({ reservation }) {
//   return (
//       <button
//           onClick={() => {
//               const encodedReservationId = encodeURIComponent(reservation.reservation_id);
//               window.location.href = `/reservations/${encodedReservationId}/seat`;
//           }}
//           className="btn"
//           data-reservation-id-status={reservation.reservation_id}
//       >
//           Seat
//       </button>
//   );
// }



// export default SeatButton;


import React from "react";
import { useHistory } from "react-router-dom";

function SeatButton({ reservation }) {
  const history = useHistory();

  const handleSeatClick = () => {
    const encodedReservationId = encodeURIComponent(reservation.reservation_id);
    history.push(`/reservations/${encodedReservationId}/seat`);
  };

  return (
    <button
      onClick={handleSeatClick}
      className="btn"
      data-reservation-id-status={reservation.reservation_id}
    >
      Seat
    </button>
  );
}

export default SeatButton;
