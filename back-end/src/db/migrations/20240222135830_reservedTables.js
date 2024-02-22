
exports.up = function(knex) {
    return knex.schema.createTable("reservedTables", (table) => {
        table.increments("reservation_id").primary();
        table.string("table_name").notNullable();
        table.string("capacity").notNullable();
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("reservedTables");
};
