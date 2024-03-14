import React from "react";
import { Link } from "react-router-dom";

function SeatButton({ reservation }) {
  const encodedReservationId = encodeURIComponent(reservation.reservation_id);
  const seatLink = `/reservations/${encodedReservationId}/seat`;

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
