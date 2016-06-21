// gives us an interface into mongodb. provide
// models to mongodb that maps directly to databse
var mongoose = require('mongoose');

// create the movie schema
var MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    }
});

// need to pass the require back
// Export the model schema
//module.exports = MovieSchema;
module.exports = mongoose.model('movie', MovieSchema);