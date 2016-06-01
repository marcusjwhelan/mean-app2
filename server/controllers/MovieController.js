
var restful = require('node-restful');

module.exports = function(app, route){
    // Setup the controll for REST
    var rest = restful.model(
        'movie', // providing the name
        app.models.movie // this model .. next line 
        ).methods(['get','put','post','delete']); // provide these on
        
    // Register this endpoint with the application
    rest.register(app,route);
    
    //return middleware.
    //custom,.. per controller basis. 
    return function(req,res, next){
        next();
    };
};