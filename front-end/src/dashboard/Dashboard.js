import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { ArrowRightIcon, ArrowLeftIcon } from "@primer/octicons-react";
import { next, previous } from "../utils/date-time";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(date);

  useEffect(loadDashboard, [selectedDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: selectedDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
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
        <ErrorAlert error={reservationsError} />
        {JSON.stringify(reservations)}
      </main>
      <div className="form-buttons">
        <button onClick={handlePreviousClick} type="button" class="btn btn-primary btn-lg">
          {<ArrowLeftIcon size={36} />}
        </button>
        <button onClick={handleNextClick} type="button" class="btn btn-primary btn-lg">
          {<ArrowRightIcon size={36} />}
        </button>
      </div>
    </>
  );
}

export default Dashboard;
