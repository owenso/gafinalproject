var ExerciseDetailCtrl = angular.module('ExerciseDetailCtrl', ['ExerciseService']);

ExerciseCtrl.controller('ExerciseDetailCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
  	$http.get('/api/exercises/' + $routeParams.exerciseId).success(function(data) {
      $scope.exercise = data;
    });
  }]);