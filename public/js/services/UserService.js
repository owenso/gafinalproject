var UserService = angular.module('UserService', []);
UserService.factory('UserDataOp', ['$http', function ($http) {

    var urlBase = '/api';
    var UserDataOp = {};

    UserDataOp.getUsers = function () {
        return $http.get(urlBase+'/users');
    };
    UserDataOp.getUser = function (userid) {
        return $http.get(urlBase+'/users/' + userid);
    };
    UserDataOp.addUser = function (user) {
        return $http.post(urlBase + '/adduser', user);
    };
    return UserDataOp;

}]);