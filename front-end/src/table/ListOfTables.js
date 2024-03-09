import EachTable from "./EachTable";

function ListOfTables({ tables, reservations }) {

  if (tables?.length) {
    const listOfTables = tables.map((table) => {
      const reservationForTable = reservations.find((reservation) => reservation.reservation_id === table.reservation_id);
      return (
        <EachTable key={table.table_id} table={table} reservation={reservationForTable} />
      );
    });
    
    return (
      <>
      <h3 className="headings">Tables</h3>
      <section className="mt-4">
        
        {listOfTables}
      </section>
      </>
    );
  }
  return null;
}

export default ListOfTables;


