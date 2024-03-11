import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
// import { ArrowRightIcon, ArrowLeftIcon } from "@primer/octicons-react";
import { next, previous } from "../utils/date-time";
import ListOfReservations from "../reservation/ListOfReservations";
import ListOfTables from "../table/ListOfTables";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([])
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null)
  const [selectedDate, setSelectedDate] = useState(date);

  useEffect(loadDashboard, [selectedDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
  
    // Fetch reservations
    listReservations({ date: selectedDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
  
    // Fetch tables
    listTables(abortController.signal)
      .then(setTables)
      .catch(setTablesError);
  
    return () => abortController.abort();
  }
  

  const handleNextClick = () => {
    const nextDate = next(selectedDate);
    setSelectedDate(nextDate);
  };

  const handlePreviousClick = () => {
    const prevDate = previous(selectedDate);
    setSelectedDate(prevDate);
  };

  return (
    <>
      <main>
        <h1>Dashboard</h1>
        <div className="d-md-flex mb-3">
          <h4 className="mb-0">Reservations for date</h4>
        </div>
        <ErrorAlert error1={tablesError} error={reservationsError} />
        <ListOfReservations tables={tables} reservations={reservations}/>
 
      </main>
      <div style={{marginBottom: "40px"}} className="form-buttons">
        <button
          onClick={handlePreviousClick}
          type="button"
          className="btn  btn-lg"
        >
          <div style={{display: "flex"}}>
          
          PREV
          </div>
        </button>
        <button
          onClick={handleNextClick}
          type="button"
          className="btn  btn-lg"
        > <div style={{display: "flex"}}>
          NEXT
          </div>
        </button>
      </div>
      <ListOfTables tables={tables} reservations={reservations} />
    </>
  );
}

export default Dashboard;
