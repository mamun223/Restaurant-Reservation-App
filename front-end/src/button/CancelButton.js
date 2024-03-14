import { useState, useEffect } from "react";
import { updateReservationStatusToCancelled} from "../utils/api";


function CancelButton({ reservation }) {

    const [error, setError] = useState(null)

    
    const handleCancel = async () => {
        
        const result = window.confirm(
          "Do you want to cancel this reservation?\n\n This cannot be undone."
        );
        try {
          if (result) {
            
            await updateReservationStatusToCancelled(reservation.reservation_id, reservation.status)
            window.location.reload(true);
          }
        } catch(error) {
          setError(error)
        }
    
      };
    return (
        <button
              onClick={handleCancel}
              className="btn"
              data-reservation-id-cancel={reservation.reservation_id}
            >
              Cancel
            </button>
    )
}

export default CancelButton;