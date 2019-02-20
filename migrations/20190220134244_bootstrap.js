// What changes are to be applied to the database?
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(tbl) {
    // Autogenerates the primary key which auto-increments  
    tbl.increments();

    tbl.string('name', 255).notNullable();
  });
};

// How can I undo the changes? Undoes the structure, not the data
exports.down = function(knex, Promise) {
  
};
