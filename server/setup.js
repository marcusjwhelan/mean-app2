// Required dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    _ = require('lodash');
    
// get path
//var path = require('path');

//****** create the application  ******
var app = express();

// Port for cloud environments.
//var port = process.env.PORT;
var port = 8081;

app.use(express.static(__dirname + '/public'));

// add middleware necassary for REST API's 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Metho-Override')); // use put etc

// CORS support, more middleware,
// exposes api to all url's. opened up api to any server. 
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

/* // at url call function, pass request, response, give ability
// to go to next middleware. always have to call next();
app.use('/hello', function(req,res,next){
    res.send('Hello World!');
    next();
})
*/


// Connect to MongoDB
// on server. localhost would be url of that server/ database name
// On cloud 9 you can get the number used 27017 when you run 
// ./mongod . and the name at the end is the name of your db.
// you can create a database using mongo --> use <name>
mongoose.connect('mongodb://localhost:27017/mean-app2');
mongoose.connection.once('open', function(){
    
    // assign all the models to the app. 
    // get a list of all the models
    // Load the models, used to dependency inject them into the controllers
    app.models = require('./models/index');
    
    // load all the routes
    var routes = require('./routes');
    // iterates over all routes. and assigns the value = controller.
    // and assigns the key = route key =/movie, value = moviecontroller
    _.each(routes, function(controller, route){
        // declaring and calling the controller and it is returned
        // check the next() in the moviecontroller.
        app.use(route,controller(app,route));
    });
    
    
    console.log('Listening on Port ... '+ port);
    app.listen(port);
});