
var ExerciseService = angular.module('ExerciseService', []);
ExerciseService.factory('ExerciseDataOp', ['$http', function ($http) {

    var urlBase = '/api';
    var ExerciseDataOp = {};

    ExerciseDataOp.getExercises = function () {
        return $http.get(urlBase+'/exercises');
    };

    ExerciseDataOp.addExercise = function (Exercise) {
        return $http.post(urlBase + '/addexercise', exercise);
    };
    return ExerciseDataOp;

}]);