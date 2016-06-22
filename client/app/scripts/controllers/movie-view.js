'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MovieViewCtrl
 * @description
 * # MovieViewCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
  .controller('MovieViewCtrl', function (
    $scope,
    $routeParams,
    Movie
  ){
  // because addition of tabs
  $scope.viewMovie = true;
  //assign movie objectV / pass id from route comes form url 
  // declaration ie /:id. 
  $scope.movie = Movie.one($routeParams.id).get().$object;
});
