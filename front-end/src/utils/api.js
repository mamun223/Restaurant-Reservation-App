/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-date";

const API_BASE_URL =
  // process.env.REACT_APP_API_BASE_URL ||
  "https://restaurant-reservation-backend-zkhd.onrender.com";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

export async function searchReservationsByPhoneNumber(mobileNumber) {
  console.log("mobileNumber: ", mobileNumber)
  const url = new URL(`${API_BASE_URL}/search?mobile_number=${mobileNumber}`);
  url.searchParams.append("mobile_number", mobileNumber);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch reservations.");
  }

  return await response.json();
}




export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  const response = await fetch(url, { headers, signal });
  if (!response.ok) {
    throw new Error("Failed to fetch tables.");
  }
  return await response.json();
}

async function createReservation(reservation, signal) {
  const url = `${API_BASE_URL}/reservations`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(reservation),
    signal,
  };
  return await fetchJson(url, options, reservation);
}

export async function createReservedTable(reservedTable, signal) {
  const url = `${API_BASE_URL}/tables`;
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(reservedTable),
    signal,
  };
  return await fetchJson(url, options, reservedTable);
}

export async function fetchReservations(dateParam, signal) {
  const url = `${API_BASE_URL}/reservations?reservation_date=${dateParam}`;
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error("Failed to fetch reservations");
  }
  return response.json();
}

export async function readTable(tableId) {
  const url = `${API_BASE_URL}/tables/${tableId}`;
  return await fetchJson(url, {});
}

export async function freeTable(table) {
  const url = `${API_BASE_URL}/tables/${table.table_id}/seat`;
  return await fetchJson(url, { method: "DELETE", headers }, {});
}

export async function removeReservation(reservationId) {
  const url = `${API_BASE_URL}/reservations/${reservationId}`;
  return await fetchJson(url, { method: "DELETE", headers }, {});
}

export async function updateTableReservationId(table) {
  const url = `${API_BASE_URL}/tables/${table.table_id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: { reservation_id: table.reservation_id } }),
  };
  return await fetchJson(url, options, {});
}

export async function updateReservationStatus(reservationId) {

  const url = `${API_BASE_URL}/reservations/${reservationId}/status`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({
      data: { reservation_id: reservationId, status: "booked" },
    }),
  };
  return await fetchJson(url, options, {});
}

export async function getReservation(reservationId) {
  console.log("reservationId in getReservation api: ", reservationId)
  const url = `${API_BASE_URL}/reservations/${reservationId}`;
  return await fetchJson(url, {});
}

export async function updateReservation(reservation) {
  console.log(reservation.reservation_id)
  const url = `${API_BASE_URL}/reservations/${reservation.reservation_id}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({
      data: {
        reservation_id: reservation.reservation_id,
        first_name: reservation.first_name,
        last_name: reservation.last_name,
        mobile_number: reservation.mobile_number,
        reservation_date: reservation.reservation_date,
        reservation_time: reservation.reservation_time,
        people: reservation.people, },
    }),
  };
  return await fetchJson(url, options, {});
}

export async function updateReservationStatusToCancelled(reservationId, status) {
  console.log("status: ", status, "reservationsId: ", reservationId)
  const url = `${API_BASE_URL}/reservations/${reservationId}/${status}`;
  const options = {
    method: "PUT",
    headers,
    body: JSON.stringify({
      data: { reservation_id: reservationId, status: status },
    }),
  };
  return await fetchJson(url, options, {});
}



export default createReservation;
