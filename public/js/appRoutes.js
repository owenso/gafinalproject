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
        .otherwise({
            redirecto: '/'
        });

    $locationProvider.html5Mode(true);

}]);