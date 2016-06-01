// Required dependencies
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    Resource = require('resourcejs'),
    _ = require('lodash');
    
// get path
var path = require('path');

//****** create the application  ******
var app = express();

// Port for cloud environments.
var port = process.env.PORT;

// add middleware necassary for REST API's 
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Metho-Override')); // use put etc

// CORS support
app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

/*
app.use('/hello', function(req,res,next){
    res.send('Hello World!');
    next();
})
*/


// Connect to MongoDB
mongoose.connect('mongodb://localhost/mean-app2');
mongoose.connection.once('open', function(){
    // get a list of all the models
    // Load the models, used to dependency inject them into the controllers
    app.models = require('./models/index');
    
    // load all the routes
    var routes = require('./routes');
    _.each(routes, function(controller, route){
        app.use(route,controller(app,route));
    });
    
    
    console.log('Listening on Port ... '+ path);
    app.listen(port);
});