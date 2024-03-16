exports.up = function(knex) {
    return knex.schema.createTable('example_table', function(table) {
      table.increments('id').primary();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('example_table');
  };
  
  