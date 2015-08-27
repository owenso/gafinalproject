angular.module('LoginCtrl', []).controller('LoginController', function($scope, $http, $window, $rootScope) {

    $scope.login = function() {
        $http
            .post('/login', $scope.user)
            .success(function(data, status, headers, config) {
                $window.sessionStorage.username = data.username;
                $window.sessionStorage.email = data.email;
                $window.sessionStorage.id = data._id;
                $window.sessionStorage.name = data.name;

                $rootScope.currentUserSignedIn = true;
                $rootScope.currentUsername = data.name;

            })
            .error(function(data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.username;
                delete $window.sessionStorage.email;
                delete $window.sessionStorage.id;
                delete $window.sessionStorage.name;

                $rootScope.currentUserSignedIn = false;
                delete $rootScope.currentUsername;
                // Handle login errors here
                $scope.message = 'Error: Invalid user or password';
                                console.log($scope.message);

            });
    };
    $scope.logout = function() {
                console.log('in here');
        $http
            .post('/logout')
            .success(function(data, status, headers, config) {
                delete $window.sessionStorage.username;
                delete $window.sessionStorage.email;
                delete $window.sessionStorage.id;
                delete $window.sessionStorage.name;

                $rootScope.currentUserSignedIn = false;
                delete $rootScope.currentUsername;
            });
    };
});

