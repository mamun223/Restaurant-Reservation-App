

function SearchForm({ handleSubmit, handleChange, mobileNumber }) {

    return (
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <label htmlFor="mobileNumber">Enter a customer's phone number</label>
            <input
              type="text"
              name="mobileNumber"
              value={mobileNumber}
              onChange={handleChange}
              className="form-control"
              id="mobileNumber"
              placeholder="Enter a customer's phone number"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Find
          </button>
        </form>
      );
  
}

export default SearchForm;
