'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngRoute',
    'restangular'
  ])
  .config(function ($routeProvider,RestangularProvider) {
    // base api to send to the server
    //added from video.. Set this to the API START POINT!!!! 
    RestangularProvider.setBaseUrl('https://mean-app2-marcusjwhelan.c9users.io:8081');

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',

      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',

      })
      .when('/movies', {
        templateUrl: 'views/movies.html',
        controller: 'MoviesCtrl',

      })
      .when('/create/movie', {
        templateUrl: 'views/movie-add.html',
        controller: 'MovieAddCtrl',
        controllerAs: 'movieAdd'
      })
      .when('/movie/:id', {
        templateUrl: 'views/movie-view.html',
        controller: 'MovieViewCtrl',
        controllerAs: 'movieView'
      })
      .when('/movie/:id/delete', {
        templateUrl: 'views/movie-delete.html',
        controller: 'MovieDeleteCtrl',
        controllerAs: 'movieDelete'
      })
      .when('/movie/:id/edit', {
        templateUrl: 'views/movie-edit.html',
        controller: 'MovieEditCtrl',
        controllerAs: 'movieEdit'
      })
      .when('/movie/:id/edit', {
        templateUrl: 'views/movie-edit.html',
        controller: 'MovieEditCtrl',
        controllerAs: 'movieEdit'
      })
      .otherwise({
        redirectTo: '/'
      });
  })    // do this to have _id use for maybe performance?
  .factory('MovieRestangular', function(Restangular) {
    return Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setRestangularFields({
        id: '_id'
      });
    });
  })  // Movie object to include in our controller. to point to
  .factory('Movie', function(MovieRestangular) {
              // the movie endpoint in the api
    return MovieRestangular.service('movie');
  })
  /*
    Directives 
    we have to create the template. in app/views/youtube.html
  */
  .directive('youtube', function() {
    return {
      // restrict this to the element tag 'youtube'
      restrict: 'E',
      // allow to pass in params to the youtube element
      scope: {
        src: '='
      },
      // when you see. replace the template with this url
      templateUrl: 'views/youtube.html'
    };
  })
  // must add this fileter to directive
  // bc copy and pasting not trusted urls. ie youtube
  .filter('trusted', function ($sce) {
    return function(url) {
      if(url){
        // either work
        //return $sce.trustAsResourceUrl(url.replace("watch?v=","embed/"));
        return $sce.trustAsResourceUrl(
          "https://youtube.com/embed/"+url.substr(url.indexOf("=")+1));
      }
    };
  });
