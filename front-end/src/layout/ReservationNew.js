function ReservationNew({ reservation, handleSubmit, handleCancel, handleChange }) {
  return (
    <>
      <div class="form-floating mb-3">
      <label for="floatingInput">First name</label>
        <input
          name="first_name"
          value={reservation.first_name}
          onChange={handleChange}
          class="form-control"
          id="floatingInput"
          placeholder="first name"
        />
      </div>
      <div class="form-floating mb-3">
      <label for="floatingInput">Last name</label>
        <input
          name="last_name"
          value={reservation.last_name}
          onChange={handleChange}
          class="form-control"
          id="floatingInput"
          placeholder="last Name"
        />
      </div>
      <div class="form-floating mb-3">
      <label for="floatingInput">Mobile number</label>
        <input
          name="mobile_number"
          value={reservation.mobile_number}
          onChange={handleChange}
          class="form-control"
          id="floatingInput"
          placeholder="mobile number"
        />
      </div>
      <div class="form-floating mb-3">
      <label for="floatingInput">Date</label>
        <input
          name="reservation_date"
          value={reservation.reservation_date}
          onChange={handleChange}
          class="form-control"
          id="floatingInput"
          placeholder="reservation date"
        />
      </div>
      <div class="form-floating">
      <label for="floatingPassword">Time</label>
        <input
          name="reservation_time"
          value={reservation.reservation_time}
          onChange={handleChange}
          class="form-control"
          id="floatingPassword"
          placeholder="reservation time"
        />
      </div>
      <div class="form-floating">
      <label for="floatingPassword">People</label>
        <input
          name="people"
          value={reservation.people}
          onChange={handleChange}
          class="form-control"
          id="floatingPassword"
          placeholder="number of people"
        />
      </div>

      <div className="form-buttons" >
      <button onClick={handleSubmit} type="button" class="btn btn-primary btn-lg">Submit</button>
      <button onClick={handleCancel} type="button" class="btn btn-danger btn-lg">Cancel</button>
      </div>
    </>
  );
}

export default ReservationNew;
