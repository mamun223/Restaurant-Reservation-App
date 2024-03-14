
// function SeatButton({ reservation }) {
//   return (
//       <button
//           onClick={() => {
//               const encodedReservationId = encodeURIComponent(reservation.reservation_id);
//               window.location.href = `/reservations/${reservation.reservation_id}/seat`;
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
import { Link } from "react-router-dom";

function SeatButton({ reservation }) {
  const encodedReservationId = encodeURIComponent(reservation.reservation_id);
  const seatLink = `/reservations/${reservation.reservation_id}/seat`;

  return (
    <Link
      to={seatLink}
      className="btn"
      data-reservation-id-status={reservation.reservation_id}
    >
      Seat
    </Link>
  );
}

export default SeatButton;
