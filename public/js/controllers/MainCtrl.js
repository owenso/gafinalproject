angular.module('MainCtrl', []).controller('MainController', function($scope, $window, $rootScope) {

    $scope.tagline = 'I regretted this almost immediately!';   
    if ($window.sessionStorage.id){
    	$rootScope.currentUserSignedIn = true;
    	$rootScope.currentUsername = $window.sessionStorage.username;

    };
});