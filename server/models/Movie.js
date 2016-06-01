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
})

// need to pass the require back
// Export the model schema
module.exports = MovieSchema;