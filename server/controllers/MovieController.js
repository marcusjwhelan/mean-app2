

var restful = require('node-restful');

module.exports = function(app, route){
    // Setup the controll for REST
    var rest = restful.model(
        'movie', // providing the name
        app.models.movie // grab movie from the models
        ).methods(['get','put','post','delete']); // exposed methods
        
    // Register this endpoint with the application
    rest.register(app,route);
    
    //return middleware.
    //custom,.. per controller basis. 
    return function(req,res, next){
        next();
    };
};

/*
var Resource = require('resourcejs');
module.exports = function(app, route) {

  // Setup the controller for REST;
  Resource(app, '', route, app.models.movie).rest();

  // Return middleware.
  return function(req, res, next) {
    next();
  };
};*/