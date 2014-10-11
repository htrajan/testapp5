angular.module('app')

.controller('mainController', function($scope, $log, $http, $location) {
  $log.log('mainController');
  console.log("HEREEEEE");
})


// Home
.controller('homeController', function($scope, $log) {
  $log.log('homeController');

});