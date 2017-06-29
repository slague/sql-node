// define routes here in this file



const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

// taken from express documentation run in command line node server.just

var express = require('express')
// setting this eqaul to a new instance of express
var app = express()
// need this for post requests
var bodyParser = require('body-parser')

// set the port to whatever is set in the enviroment variable, or 3000
app.set('port', process.env.PORT || 3000)
// app.locals stores data within our app variable(for now...later we'll use a database), app.locals you set local variabls on the app
app.locals.title = 'Secret Box'
// app.locals.secrets = {
//   wow: 'I am a banana'
// }
app.use(bodyParser.json())
// parsing data submitted via a form or other text -- NOT json
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(request, response) {
  response.send(app.locals.title)
})

app.get('/api/secrets/:id', function(request, response) {
  var id = request.params.id
  // eval(pry.it)
  database.raw('SELECT * FROM secrets WHERE id=?', [id])
  .then( function(data) {
    if (data.rowCount == 0) { return response.sendStatus(404) }
    var message = data.rows[0]
    response.json(message)
  });

})

app.post('/api/secrets', function(request, response){
// just doing date.now for now, when we start using a database it will be incremented for us
  var id = Date.now()
  var message = request.body.message

  if(!message){ return response.status(422).send({error: "No message property provided"})}

  app.locals.secrets[id] = message
  response.status(201).json({id, message})
})

// listen for requests coming to this port- this is necessary, the console.log is what you see in the command line when you launch the server
if(!module.parent){
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
    // back tick `` is string interpolation used in ES6.. the old way is concatonation "" + ""
  })
}

module.exports = app


// for testing purposes we want to set up ANOTHER instance of express with a different port, don't always launch and listen...
// if we are testing do this other thing: wrap with if statement... if we run this from our test file, it will have a parent and so if NOT this then run regular, if YES this, then testing
