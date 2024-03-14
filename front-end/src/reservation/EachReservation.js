import React from "react";
import SeatButton from "../button/SeatButton";
import EditButton from "../button/EditButton";
import CancelButton from "../button/CancelButton";

function EachReservation({ reservation, table }) {
  if (!reservation) return null;

  const { status } = reservation;
  const isBookedOrSeated = status === "booked" || status === "seated";
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="card border border-info" style={{ width: "12rem" }}>
          <div className="card-body">
            <div style={{ textAlign: "center" }}>
              <h5 className="card-title">{reservation.last_name}</h5>
              <h5 className="card-title">{reservation.status}</h5>
              {reservation.status === "booked" ? (
                <SeatButton reservation={reservation} />
              ) : null}
            </div>
          </div>
        </div>
        <div
          style={{ display: "flex", paddingTop: "5px", paddingBottom: "25px" }}
        >
          {/* Check if the reservation status is either "booked" or "seated" */}
          {isBookedOrSeated && (
            <div style={{ paddingRight: "61px" }}>
              <EditButton reservation_id={reservation.reservation_id} />
            </div>
          )}
          {/* Check if the reservation status is either "booked" or "seated" */}
          {isBookedOrSeated && (
            <CancelButton reservation={reservation} />
          )}
        </div>
      </div>
    </>
  );
}

export default EachReservation;
