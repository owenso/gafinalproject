var DoWorkoutCtrl = angular.module('DoWorkoutCtrl', ['WorkoutService']);

DoWorkoutCtrl.controller('DoWorkoutCtrl', ['$scope', '$routeParams', '$http','$window', '$rootScope',
  function($scope, $routeParams, $http, $window, $rootScope) {
  	$http.get('/api/workouts/' + $routeParams.workoutId).success(function(data) {
      $scope.workout = data[0];
    });

	if ($window.sessionStorage.id){
  	$rootScope.currentUserSignedIn = true;
  	$rootScope.currentName = $window.sessionStorage.name;
  	$rootScope.currentId = $window.sessionStorage.id;
  }
  }]);