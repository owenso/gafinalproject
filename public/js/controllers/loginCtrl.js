angular.module('LoginCtrl', []).controller('LoginController', function($scope, $http, $window) {

    $scope.status;
    $scope.message = "Login";
    $scope.submit = function() {
        $http
            .post('/login', $scope.user)
            .success(function(data, status, headers, config) {
                $window.sessionStorage.username = data.username;
                $window.sessionStorage.email = data.email;
                $window.sessionStorage.id = data._id;
                $window.sessionStorage.name = data.name;


                $scope.message = 'Welcome ' + $window.sessionStorage.name;
            })
            .error(function(data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.username;
                delete $window.sessionStorage.email;
                delete $window.sessionStorage.id;
                delete $window.sessionStorage.name;


                // Handle login errors here
                $scope.message = 'Error: Invalid user or password';
                                console.log($scope.message);

            });
    };
});

