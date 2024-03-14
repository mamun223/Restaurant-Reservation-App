

function SeatButton({ reservation }) {
    return (
        <button
              onClick={() => {
                window.location.href = `/reservations/${reservation.reservation_id}/seat`;
              }}
              className="btn"
              data-reservation-id-status={reservation.reservation_id}
            >
              Seat
            </button>
    )
}

export default SeatButton;