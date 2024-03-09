import React from "react";
import SeatButton from "../button/SeatButton";

function EachReservation({ reservation, table }) {
  console.log("@@@@@",table)
  if (!reservation) return null;
  return (
    <div className="card border border-info" style={{ width: "12rem" }}>
      <div className="card-body">
        <div style={{ textAlign: "center" }}>
          <h5 className="card-title">{reservation.last_name}</h5>
          <h5 className="card-title">{reservation.status}</h5>
          {reservation.status === "booked"? (
            <SeatButton reservation={reservation} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default EachReservation;
