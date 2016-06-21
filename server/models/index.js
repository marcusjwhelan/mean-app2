// anyone who requires index will get this object back
// this will be a place to list all your models in a system.
module.exports = {
  // key value pair
  // This is where you add all your models. 
  // someone calls movie they get the movie model.
  movie: require('./Movie.js')
};