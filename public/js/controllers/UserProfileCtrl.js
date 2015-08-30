var UserProfileCtrl = angular.module('UserProfileCtrl', ['UserService']);

UserProfileCtrl.controller('UserProfileCtrl', ['$scope', '$routeParams', '$http', 'UserDataOp',
  function($scope, $routeParams, $http, UserDataOp) {
  	function getUserData() {
        UserDataOp.getUser($routeParams.currentId)
            .success(function(user) {
            	console.log(user[0]);
                $scope.user = user[0];
            })
            .error(function(error) {
                $scope.status = 'Unable to load data: ' + error.message;
            });
    }
  		getUserData();
  }]);