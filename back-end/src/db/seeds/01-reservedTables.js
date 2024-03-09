exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tables")
    .del()
    .then(function () {
      return knex("tables").insert([
        {
          table_name: "Rick",
          capacity: 4,
          created_at: "2020-12-10T08:30:32.326Z",
          updated_at: "2020-12-10T08:30:32.326Z",
        },
        {
          table_name: "Bar #1",
          capacity: 1,
        },
        {
          table_name: "Bar #2",
          capacity: 1,
        }, 
        {
          table_name: "#1",
          capacity: 6,
        },
        {
          table_name: "#2",
          capacity: 6,
        }
      ]);
    });
};

