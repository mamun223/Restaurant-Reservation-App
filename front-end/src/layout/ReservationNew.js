import React from "react";

function ReservationNew({
  reservation,
  handleSubmit,
  handleCancel,
  handleChange,
}) {
  return (
    <>
      <div className="form-floating mb-3">
        <label htmlFor="floatingInput">First name</label>
        <input
          name="first_name"
          value={reservation.first_name}
          onChange={handleChange}
          className="form-control"
          id="floatingInput"
          placeholder="first name"
        />
      </div>
      <div className="form-floating mb-3">
        <label htmlFor="floatingInput">Last name</label>
        <input
          name="last_name"
          value={reservation.last_name}
          onChange={handleChange}
          className="form-control"
          id="floatingInput"
          placeholder="last Name"
        />
      </div>
      <div className="form-floating mb-3">
        <label htmlFor="floatingInput">Mobile number</label>
        <input
          name="mobile_number"
          value={reservation.mobile_number}
          onChange={handleChange}
          className="form-control"
          id="floatingInput"
          placeholder="mobile number"
        />
      </div>
      <div className="form-floating mb-3">
        <label htmlFor="floatingInput">Date</label>
        <input
          name="reservation_date"
          value={reservation.reservation_date}
          onChange={handleChange}
          className="form-control"
          id="floatingInput"
          placeholder="reservation date"
          type="date"
        />
      </div>
      <div className="form-floating">
        <label htmlFor="floatingPassword">Time</label>
        <input
          name="reservation_time"
          value={reservation.reservation_time}
          onChange={handleChange}
          className="form-control"
          id="floatingPassword"
          placeholder="reservation time"
          type="time"
        />
      </div>
      <div className="form-floating">
        <label htmlFor="floatingPassword">People</label>
        <input
          name="people"
          value={reservation.people}
          onChange={handleChange}
          className="form-control"
          id="floatingPassword"
          placeholder="number of people"
        />
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
    </>
  );
}

export default ReservationNew;
