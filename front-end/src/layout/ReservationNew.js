function ReservationNew() {
  return (
    <>
      <div class="form-floating mb-3">
      <label for="floatingInput">First name</label>
        <input
          name="first_name"
          class="form-control"
          id="floatingInput"
          placeholder="first name"
        />
      </div>
      <div class="form-floating mb-3">
      <label for="floatingInput">Last name</label>
        <input
          name="last_name"
          class="form-control"
          id="floatingInput"
          placeholder="last Name"
        />
      </div>
      <div class="form-floating mb-3">
      <label for="floatingInput">Mobile number</label>
        <input
          name="mobile_number"
          class="form-control"
          id="floatingInput"
          placeholder="mobile number"
        />
      </div>
      <div class="form-floating mb-3">
      <label for="floatingInput">Date</label>
        <input
          name="reservation_email"
          class="form-control"
          id="floatingInput"
          placeholder="reservation date"
        />
      </div>
      <div class="form-floating">
      <label for="floatingPassword">Time</label>
        <input
          name="reservation_time"
          class="form-control"
          id="floatingPassword"
          placeholder="reservation time"
        />
      </div>
      <div class="form-floating">
      <label for="floatingPassword">People</label>
        <input
          name="people"
          class="form-control"
          id="floatingPassword"
          placeholder="number of people"
        />
      </div>

      <div className="form-buttons" >
      <button type="button" class="btn btn-primary btn-lg">Submit</button>
      <button type="button" class="btn btn-danger btn-lg">Cancel</button>
      </div>
    </>
  );
}

export default ReservationNew;
