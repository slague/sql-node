const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


// See something- READ

// database.raw('SELECT * FROM secrets')
// .then( function(data) {
//   console.log(data.rows[0])
//   process.exit();
// });

// add something to CREATE
database.raw(
  'INSERT INTO secrets (message, created_at) VALUES (?, ?)',
  ["I open bananas from the wrong side", new Date]
).then( function() {
  database.raw('SELECT * FROM secrets')
  .then( function(data) {
    console.log(data.rows)
    process.exit();
  });
});
