exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE secrets RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO secrets (message, created_at) VALUES (?, ?)',
        ["I don't hate mashed potatoes", new Date]
      ),
      knex.raw(
        'INSERT INTO secrets (message, created_at) VALUES (?, ?)',
        ["I love chocolate", new Date]
      ),
      knex.raw(
        'INSERT INTO secrets (message, created_at) VALUES (?, ?)',
        ["I don't hate game shows", new Date]
      )
    ]);
  });
};
