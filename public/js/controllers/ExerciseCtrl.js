var ExerciseCtrl = angular.module('ExerciseCtrl', ['ExerciseService']);

ExerciseCtrl.controller('ExerciseController', function($scope, $http, $window, ExerciseDataOp) {
    $scope.status = 'exercise page loaded';
    $scope.exercises;
    $scope.orderProp = 'bodypart_name';

    getExercises();
    
    $scope.addExercise = function() {

        var exercise = {
            ID: 145,
            FirstName: $scope.fname,
            LastName: $scope.lname
        };
        ExerciseDataOp.addExercise(exercise)
            .success(function() {
                $scope.status = 'Inserted Exercise! Refreshing Exercise list.';
                $scope.exercises.push(exercise);
            }).
        error(function(error) {
            $scope.status = 'Unable to insert Exercise: ' + error.message;
        });
    };
    function getExercises() {
        ExerciseDataOp.getExercises()
            .success(function(exercises) {
                $scope.exercises = exercises;
            })
            .error(function(error) {
                console.log('you done fucked up');
                $scope.status = 'Unable to load data: ' + error.message;
            });
    }
});