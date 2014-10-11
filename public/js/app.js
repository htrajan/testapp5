angular.module('app', ['ngRoute'])


.config(function($routeProvider) {

  $routeProvider
    .when('/', {
      templateUrl: 'partials/testpage.html',
      controller: 'mainController'

    })

    .when('/test1', {
      templateUrl: 'partials/testpage.html',
      controller: 'mainController'
    })

    .when('/test2', {
      templateUrl: 'partials/testpage2.html',
      controller: 'mainController'
    });
})


.run(function($rootScope, $log, $http) {

  $rootScope.pageColors = ['#5f9ae8', '#f77d7b', '#ab94ce', '#f7a559', '#76c976'];

  

});