// angular.module('UserCtrl', []).controller('UserController', function($scope) {
//     $scope.tagline = 'Nothing beats a pocket protector!';
// });

var UserCtrl = angular.module('UserCtrl', ['UserService']);

UserCtrl.controller('UserController', function($scope, $http, $window, UserDataOp) {
    $scope.status;
    $scope.users;
    $scope.message = "this is where the message lives";
    getUsers();
    
    $scope.addUser = function() {

        var user = {
            ID: 145,
            FirstName: $scope.fname,
            LastName: $scope.lname
        };
        UserDataOp.addUser(user)
            .success(function() {
                $scope.status = 'Inserted User! Refreshing User list.';
                $scope.users.push(user);
            }).
        error(function(error) {
            $scope.status = 'Unable to insert User: ' + error.message;
        });
    };
    function getUsers() {
        UserDataOp.getUsers()
            .success(function(users) {
                $scope.users = users;
            })
            .error(function(error) {
                $scope.status = 'Unable to load data: ' + error.message;
            });
    }
    function welcome(){
    	$scope.message = 'Welcome';
      $scope.status = "Working?";
    }
});


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
