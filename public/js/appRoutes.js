    angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/users', {
            templateUrl: 'views/user.html',
            controller: 'UserController'
        })
        .when('/exercises', {
            templateUrl: 'views/exercises.html',
            controller: 'ExerciseController'
        })
        .when('/exercises/:exerciseId', {
            templateUrl: 'views/partials/indivexercise.html',
            controller: 'ExerciseDetailCtrl'
        })
        .when('/users/:currentId', {
            templateUrl: 'views/userpage.html',
            controller: 'UserProfileCtrl'
        })
        .when('/workouts', {
            templateUrl: 'views/workouts.html',
            controller: 'WorkoutCtrl'
        })
        .when('/workouts/:workoutId', {
            templateUrl: 'views/doworkout.html',
            controller: 'DoWorkoutCtrl'
        })
        .otherwise({
            redirecto: '/'
        });

    $locationProvider.html5Mode(true);

}]);