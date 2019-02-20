
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Smarty McSmartyPants', cohort_id: 'WEB16'},
        {name: 'Knows React', cohort_id: 'WEB15'},
        {name: 'Class Clown', cohort_id: 'WEB16'}
      ]);
    });
};
