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
    //this places movies into the $scope of the html page
    // $object is asynchronous   ... Check restangular
    // getList().$object populates the list. dynamicly
    $scope.movies = Movie.getList().$object;
  });
