import { useEffect, useState } from "react";
import {
  useParams,
  useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { listTables, updateTableReservationId, updateReservationStatus } from "../utils/api";
import ErrorAlert from "./ErrorAlert";

function Seat() {
  const { reservation_id } = useParams();
  const history = useHistory();
  const [tables, setTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    listTables(abortController.signal)
      .then((tables) => setTables(tables))
      .catch((error) => console.error("Error fetching tables: ", error));

    return () => abortController.abort();
  }, []);

  const handleChange = (event) => {
    const tableId = parseInt(event.target.value);
    setSelectedTableId(tableId);
  };

  const handleSubmit = async () => {
    if (!selectedTableId) return;

    try {
      const selectedTable = tables.find(
        (table) => table.table_id === selectedTableId
      );
      if (selectedTable.reservation_id === null) {
        selectedTable.reservation_id = reservation_id;
      }

      if (!selectedTable) {
        return;
      }

      await updateTableReservationId(selectedTable);
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.table_id === selectedTableId
            ? { ...table, reservation_id: reservation_id }
            : table
        )
      );
      await updateReservationStatus(reservation_id)
      history.push("/");
    } catch (error) {
      setError(error);
    }
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <>
      <ErrorAlert error={error} />
      <div className="seat-form">
        <div className="seat-select">
          <select
            onChange={handleChange}
            name="table_id"
            className="form-select"
            aria-label="Default select example"
          >
            <option value="">Select Seat</option>
            {tables.map((table) => (
              <option key={table.table_id} value={table.table_id}>
                {table.table_name} - {table.capacity}
              </option>
            ))}
          </select>
        </div>
        <div className="form-buttons">
          <button
            onClick={handleSubmit}
            type="button"
            className="btn btn-primary btn-lg"
          >
            Submit
          </button>
          <button
            onClick={handleCancel}
            type="button"
            className="btn btn-danger btn-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default Seat;
