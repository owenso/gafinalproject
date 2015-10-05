var ExerciseDetailCtrl = angular.module('ExerciseDetailCtrl', ['ExerciseService']);

ExerciseCtrl.controller('ExerciseDetailCtrl', ['$scope', '$routeParams', '$http','$window',
  function($scope, $routeParams, $rootScope, $http, $window) {
  	$http.get('/api/exercises/' + $routeParams.exerciseId).success(function(data) {
      $scope.exercise = data;
    });
    $scope.backbutton = function (){
    	$window.history.back();
    };
    if ($window.sessionStorage.id){
    	$rootScope.currentUserSignedIn = true;
    	$rootScope.currentName = $window.sessionStorage.name;
    	$rootScope.currentId = $window.sessionStorage.id;
    }
  }]);