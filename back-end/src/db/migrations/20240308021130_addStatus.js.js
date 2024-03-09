exports.up = function(knex) {
    return knex.schema.table('reservations', function(table) {
      // Add columns, modify columns, or perform any other necessary changes
      table.string('status').defaultTo('booked');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.table('reservations', function(table) {
      // Rollback changes made in the "up" function
      table.dropColumn('status');
    });
  };
  