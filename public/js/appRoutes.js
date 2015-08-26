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
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })
        .when('/exercises', {
            templateUrl: 'views/exercises.html',
            controller: 'ExerciseController'
        });
    $locationProvider.html5Mode(true);

}]);