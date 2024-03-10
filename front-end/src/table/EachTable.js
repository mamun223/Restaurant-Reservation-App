
import {React, useState} from "react";
import { freeTable, removeReservation, updateReservationStatus } from "../utils/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ErrorAlert from "../layout/ErrorAlert";

function EachTable({ table, reservation }) {
  const [error, setError] = useState(null)
  const history = useHistory();

  if (!table) return null;
  
  const handleDelete = async () => {
    const result = window.confirm(
      "Is this table ready to seat new guests?\n\n This cannot be undone."
    );
    try {
      if (result) {
        await freeTable(table)
        await updateReservationStatus(reservation.reservation_id)
        await removeReservation(reservation.reservation_id)
        window.location.reload(true);
      }

    } catch(error) {
      setError(error)
    }

  };

  return (
    <>
    <ErrorAlert error={error} />
    <div className="card text-center mb-3 border border-warning " style={{ width: "12rem" }}>
      <div className="card-body">
        <h5 className="card-title">{table.table_name}</h5>
        <p data-table-id-status={table.table_id} className="card-text">
          {table.reservation_id !== null ? "Occupied" : "Free"}
        </p>
        <button onClick={handleDelete} className="btn" data-table-id-finish={table.table_id}>
  Finish
</button>

      </div>
    </div>
    </>
  );
}

export default EachTable;




