'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MoviesCtrl
 * @description
 * # MoviesCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')// function ($scope)
  .controller('MoviesCtrl', function ($scope,Movie) {
    // this can be $scope
    // this is where you would make your object
    // $object is asynchronous
    $scope.movies = Movie.getList().$object;
  });
