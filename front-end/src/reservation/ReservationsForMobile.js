import EachReservation from "./EachReservation";

function ReservationForMobile({ reservations, mobileNumber}) {
    const { data } = reservations
    
    if (reservations.data && data.length) {
        console.log("&&&&&", reservations.data)
        const list = reservations.data.map((reservation) => {
          if (reservation.mobile_number.includes(mobileNumber)){
            
            return (
              <EachReservation
              key={reservation.reservation_id}
              reservation={reservation}
            />
            )
          }
    
          
      });
    
        return (
          <>
          <h3 className="headings">Reservations</h3>
          <section className="mt-4"> 
            {list}
          </section>
          </>
        );
      }
      return null;
}

export default ReservationForMobile;