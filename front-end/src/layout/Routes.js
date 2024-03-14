import React from "react";
import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import AddNewReservation from "./AddNewReservation";
import AddNewReservedTable from "./AddNewReservedTable";
import Seat from "./Seat";
import Search from "./Search";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  const [selectedDate, setSelectedDate] = useState(today());
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
        <Seat />
      </Route>
      <Route  path="/tables">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={selectedDate} />
      </Route>
      <Route path="/reservations/new">
        <AddNewReservation setSelectedDate={setSelectedDate} />
      </Route>
      <Route path="/tables/new">
        <AddNewReservedTable />
      </Route>
      <Route path="/search">
        <Search />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
