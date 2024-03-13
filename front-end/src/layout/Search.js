// import React, { useState } from "react";
// import ListOfReservations from "../reservation/ListOfReservations";
// import { listReservations, searchReservationsByPhoneNumber } from "../utils/api";

// function Search() {
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [reservations, setReservations] = useState([]);
//   const [error, setError] = useState(null);

//   const handleChange = (event) => {
//     setMobileNumber(event.target.value);
//   };
//   console.log("mobileNumber: ", mobileNumber);
//   const handleSubmit = () => {
//     // Fetch reservations
//     listReservations({ mobile_number: mobileNumber })
//       .then((data) => {
//         setReservations(data);
//       })
//       .catch((error) => {
//         setError(error);
//       });
//   };

//   console.log("reservations: ", reservations)

//   return (
//     <>
//     <form onSubmit={handleSubmit}>
//       <div className="form-floating mb-3">
//         <label htmlFor="mobileNumber">Enter a customer's phone number</label>
//         <input
//           type="text"
//           name="mobile_number"
//           value={mobileNumber}
//           onChange={handleChange}
//           className="form-control"
//           id="mobileNumber"
//           placeholder="Enter a customer's phone number"
//         />
//       </div>
//       <button type="submit" className="btn btn-primary">
//         Find
//       </button>
//       </form>
//       {reservations && (
//         <ListOfReservations
//           reservations={reservations}
//           mobileNumber={mobileNumber}
//         />
//       )}
//     </>
//   );
// }

// export default Search;


import React, { useState } from "react";
import SearchForm from "./SearchForm";
import { searchReservationsByPhoneNumber } from "../utils/api";
import ReservationForMobile from "../reservation/ReservationsForMobile";

function Search() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setMobileNumber(event.target.value);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await searchReservationsByPhoneNumber(mobileNumber);
      setReservations(response);
    } catch (error) {
      setError(error.message);
    }
  };

  console.log("reservations: ", reservations)
  console.log("mobileNumber: ", mobileNumber)

  return (
    <>
      <SearchForm handleSubmit={handleSubmit} handleChange={handleChange} mobileNumber={mobileNumber} />
      {error && <div>Error: {error}</div>}
      {reservations ? (
        <ReservationForMobile reservations={reservations} mobileNumber={mobileNumber}/>
      ) : (
        <p>No reservations found</p>
      )}
    </>
  );
}

export default Search;
