'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MovieAddCtrl
 * @description
 * # MovieAddCtrl
 * Controller of the clientApp
 */
 
 /*
  
 */
angular.module('clientApp')
  .controller('MovieAddCtrl', function (
    $scope,
    Movie,
    $location
  ){
  $scope.movie = {}; // creates the movie object in the scope
  $scope.saveMovie = function() { // creates the function in scope
    Movie.post($scope.movie).then(function() {
      $location.path('/movies');// changest to this url
    });
  };
});
