import ReservationNew from "./ReservationNew"
import { React } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function EditReservation () {
    const { reservation_id } = useParams();
    console.log(reservation_id)
    return (
        <p>STILL UNDER CONSTRUCTION</p>
    )
}

export default EditReservation;