import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservedTable } from "../utils/api";
import ReserveTableForm from "./ReserveTableForm";
import ErrorAlert from "./ErrorAlert";

function AddNewReservedTable() {
  const history = useHistory();

  const [reservedTable, setReservedTable] = useState({
    table_name: "",
    capacity: "" ,
  });

  const [error, setError] = useState(null); // Initialize error state

  const handleSubmit = () => {
    const abortController = new AbortController();

    createReservedTable({ data: reservedTable }, abortController.signal)
      .then((reservedTable) => {
        setReservedTable(reservedTable);
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
    setReservedTable({ ...reservedTable, [name]: value });
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <>
    <ErrorAlert error={error} /> 
    <ReserveTableForm
      reservedTable={reservedTable}
      handleSubmit={handleSubmit}
      handleCancel={handleCancel}
      handleChange={handleChange}
    />
    </>
  );
}

export default AddNewReservedTable;
