var UserCtrl = angular.module('UserCtrl', ['UserService']);

UserCtrl.controller('UserController', ['$scope', '$http', function($scope, $http, UserDataOp) {
    $scope.addUser = function() {
        UserDataOp.addUser($scope.user)
            .success(function() {
            }).
        error(function(error) {
            $scope.status = 'Unable to create User: ' + error.message;
        });
    };
}]);


// myApp.controller('UserCtrl', function($scope, $http, $window) {
//     $scope.user = {
//         username: 'john.doe',
//         password: 'foobar'
//     };
//     $scope.message = '';
//     $scope.submit = function() {
//         $http
//             .post('/authenticate', $scope.user)
//             .success(function(data, status, headers, config) {
//                 $window.sessionStorage.token = data.token;
//                 $scope.message = 'Welcome';
//             })
//             .error(function(data, status, headers, config) {
//                 // Erase the token if the user fails to log in
//                 delete $window.sessionStorage.token;

//                 // Handle login errors here
//                 $scope.message = 'Error: Invalid user or password';
//             });
//     };
// });
