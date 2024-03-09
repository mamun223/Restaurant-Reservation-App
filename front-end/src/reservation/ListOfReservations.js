import React from "react";
import EachReservation from "./EachReservation";

function ListOfReservations({ tables, reservations }) {
  if (reservations.length) {
    const list = reservations.map((reservation) => {
      const tableForReservation = tables.find((table) => 
        table.reservation_id && table.reservation_id === reservation.reservation_id)
      return (
        <EachReservation
        key={reservation.reservation_id}
        reservation={reservation}
        table={tableForReservation}
      />
      )
      
  });

    return (
      <>
      <h3 className="headings">Reservations</h3>
      <section className="mt-4"> 
        {list}
      </section>
      </>
    );
  }
  return null;
}

export default ListOfReservations;
