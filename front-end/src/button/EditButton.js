

function EditButton({ reservation_id }) {
    return (
        <button
              onClick={() => {
                window.location.href = `/reservations/${reservation_id}/edit`;
              }}
              className="btn"
            //   data-reservation-id-status={reservation.reservation_id}
            >
              Edit
            </button>
    )
}

export default EditButton;