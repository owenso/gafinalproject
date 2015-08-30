var WorkoutService = angular.module('WorkoutService', []);
WorkoutService.factory('WorkoutDataOp', ['$http', function ($http) {

    var urlBase = '/api';
    var WorkoutDataOp = {};

    WorkoutDataOp.getWorkouts = function () {
        return $http.get(urlBase+'/workouts');
    };

    WorkoutDataOp.addWorkout = function (workout) {
        return $http.post(urlBase + '/addworkout', workout);
    };

    WorkoutDataOp.addExToWorkout = function (workout, exercise) {
        return $http.post(urlBase + '/addexercise/'+ workout + '/' + exercise);
    };
    return WorkoutDataOp;

}]);