function ReserveTableForm({
  reservedTable,
  handleSubmit,
  handleCancel,
  handleChange,
}) {
  return (
    <>
      <div className="form-floating mb-3">
        <label htmlFor="floatingInput">Table Name</label>
        <input
          name="table_name"
          value={reservedTable.table_name}
          onChange={handleChange}
          className="form-control"
          id="floatingInput"
          placeholder="table name"
        />
      </div>
      <div className="form-floating mb-3">
        <label htmlFor="floatingInput">Capacity</label>
        <input
          name="capacity"
          value={reservedTable.capacity}
          onChange={handleChange}
          className="form-control"
          id="floatingInput"
          placeholder="capacity"
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

export default ReserveTableForm;
