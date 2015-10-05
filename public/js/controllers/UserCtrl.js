var UserCtrl = angular.module('UserCtrl', ['UserService']);

UserCtrl.controller('UserController', ['$scope', '$http', 'UserDataOp', '$location', '$window', '$rootScope', function($scope, $http, UserDataOp, $location, $window, $rootScope) {
    $scope.addUser = function() {
        UserDataOp.addUser($scope.user)
            .success(function(data) {
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

            	$location.path("/workouts");
            }).
        error(function(error) {
            $scope.status = 'Unable to create User: ' + error.message;
        });
    };
    if ($window.sessionStorage.id){
        $rootScope.currentUserSignedIn = true;
        $rootScope.currentName = $window.sessionStorage.name;
        $rootScope.currentId = $window.sessionStorage.id;
    }
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
