
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Smarty McSmartyPants', cohort_id: 6},
        {name: 'Knows React', cohort_id: 6},
        {name: 'Class Clown', cohort_id: 6}
      ]);
    });
};
