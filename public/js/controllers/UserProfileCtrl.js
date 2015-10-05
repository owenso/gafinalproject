var UserProfileCtrl = angular.module('UserProfileCtrl', ['UserService', 'WorkoutService']);

UserProfileCtrl.controller('UserProfileCtrl', ['$scope', '$routeParams', '$window', '$http', 'UserDataOp', 'WorkoutDataOp', '$rootScope',
  function($scope, $routeParams, $window, $http, UserDataOp, WorkoutDataOp, $rootScope) {
  	function getUserData() {
        UserDataOp.getUser($routeParams.currentId)
            .success(function(user) {
                $scope.storeDataModel = user[0];


        $scope.dayDataCollapseFn = function () {
        $scope.dayDataCollapse = [];
        for (var i = 0; i < $scope.storeDataModel.workouts.length; i += 1) {
            $scope.dayDataCollapse.push(false);
        }
    };
    
       
    $scope.selectTableRow = function (index, storeId) {
        if (typeof $scope.dayDataCollapse === 'undefined') {
            $scope.dayDataCollapseFn();
        }

        if ($scope.tableRowExpanded === false && $scope.tableRowIndexExpandedCurr === "" && $scope.storeIdExpanded === "") {
            $scope.tableRowIndexExpandedPrev = "";
            $scope.tableRowExpanded = true;
            $scope.tableRowIndexExpandedCurr = index;
            $scope.storeIdExpanded = storeId;
            $scope.dayDataCollapse[index] = true;
        } else if ($scope.tableRowExpanded === true) {
            if ($scope.tableRowIndexExpandedCurr === index && $scope.storeIdExpanded === storeId) {
                $scope.tableRowExpanded = false;
                $scope.tableRowIndexExpandedCurr = "";
                $scope.storeIdExpanded = "";
                $scope.dayDataCollapse[index] = false;
            } else {
                $scope.tableRowIndexExpandedPrev = $scope.tableRowIndexExpandedCurr;
                $scope.tableRowIndexExpandedCurr = index;
                $scope.storeIdExpanded = storeId;
                $scope.dayDataCollapse[$scope.tableRowIndexExpandedPrev] = false;
                $scope.dayDataCollapse[$scope.tableRowIndexExpandedCurr] = true;
            }
        }

    };
            })
            .error(function(error) {
                $scope.status = 'Unable to load data: ' + error.message;
            });
    }
  		getUserData();
    $scope.tableRowExpanded = false;
    $scope.tableRowIndexExpandedCurr = "";
    $scope.tableRowIndexExpandedPrev = "";
    $scope.storeIdExpanded = "";
    
    $scope.deleteWorkout = function(id, index){
        var proceed = confirm('Are you sure you want to permanently delete this workout?');
        if (proceed){
            WorkoutDataOp.deleteWorkout(id);
            $scope.storeDataModel.workouts.splice(index, 1);        
        }

    };
    if ($window.sessionStorage.id){
        $rootScope.currentUserSignedIn = true;
        // $rootScope.currentName = $window.sessionStorage.name;
        // $rootScope.currentId = $window.sessionStorage.id;
    }
  }]);