angular.module('LoginCtrl', []).controller('LoginController', function($scope, $http, $window, $rootScope, $location) {

    $scope.login = function() {
        $http
            .post('/login', $scope.user)
            .success(function(data, status, headers, config) {
                $window.sessionStorage.username = data.username;
                $window.sessionStorage.email = data.email;
                $window.sessionStorage.id = data._id;
                $window.sessionStorage.name = data.name;

                $rootScope.currentUserSignedIn = true;
                $rootScope.currentName = data.name;
                $rootScope.currentUsername = data.username;
                $rootScope.currentEmail = data.email;
                $rootScope.currentId = data._id;
                $rootScope.currentName = data.name;


                $location.path("/users/" + data._id);

            })
            .error(function(data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.username;
                delete $window.sessionStorage.email;
                delete $window.sessionStorage.id;
                delete $window.sessionStorage.name;

                $rootScope.currentUserSignedIn = false;
                delete $rootScope.currentName;
                delete $rootScope.currentUsername;
                delete $rootScope.currentEmail;
                delete $rootScope.currentId;
                delete $rootScope.currentName;
                // Handle login errors here
                $scope.message = 'Error: Invalid user or password';
                                console.log($scope.message);

            });
    };
    $scope.logout = function() {
        $http
            .post('/logout')
            .success(function(data, status, headers, config) {
                delete $window.sessionStorage.username;
                delete $window.sessionStorage.email;
                delete $window.sessionStorage.id;
                delete $window.sessionStorage.name;

                $rootScope.currentUserSignedIn = false;
                delete $rootScope.currentName;
                delete $rootScope.currentUsername;
                delete $rootScope.currentEmail;
                delete $rootScope.currentId;
                delete $rootScope.currentName;
            });
    };
});

