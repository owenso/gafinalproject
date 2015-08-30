var WorkoutCtrl = angular.module('WorkoutCtrl', ['WorkoutService', 'ngSanitize', 'ui.select']);

WorkoutCtrl.controller('WorkoutCtrl', function($scope, $routeParams, $window, $http, WorkoutDataOp) {
    $http.get('/api/exercises/').success(function(data) {
      $scope.workouts = data;
    });

    $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];
    $scope.exercises = {};
    $scope.workoutDate  = new Date();

    $scope.newWorkout = function () {
      var data = {
        workoutData:{
          title: $scope.title,
          workoutDate: $scope.workoutDate,
          comments: $scope.comments
        },
        idData:{
          id:$window.sessionStorage.id
        }
      };
        WorkoutDataOp.addWorkout(data)
            .success(function(newlyAdded) {
              for (var i = 0; i<$scope.choices.length;i++){
                  WorkoutDataOp.addExToWorkout(newlyAdded._id, $scope.choices[i].id);
              }
            })
            .error(function(error) {
                $scope.status = 'Unable to load data: ' + error.message;
            });
      };
  $scope.addNewChoice = function() {
    var newItemNo = $scope.choices.length+1;
    $scope.choices.push({'id':'choice'+newItemNo});
  };
    
  $scope.removeChoice = function() {
    var lastItem = $scope.choices.length-1;
    $scope.choices.splice(lastItem);
  };
   $scope.disabled = undefined;

  $scope.enable = function() {
    $scope.disabled = false;
  };

  $scope.disable = function() {
    $scope.disabled = true;
  };

  $scope.clear = function() {
    $scope.person.selected = undefined;
    $scope.address.selected = undefined;
    $scope.country.selected = undefined;
  };
  $scope.person = {};
  $scope.people = [
    { name: 'Adam',      email: 'adam@email.com',      age: 10 },
    { name: 'Amalie',    email: 'amalie@email.com',    age: 12 },
    { name: 'Wladimir',  email: 'wladimir@email.com',  age: 30 },
    { name: 'Samantha',  email: 'samantha@email.com',  age: 31 },
    { name: 'Estefanía', email: 'estefanía@email.com', age: 16 },
    { name: 'Natasha',   email: 'natasha@email.com',   age: 54 },
    { name: 'Nicole',    email: 'nicole@email.com',    age: 43 },
    { name: 'Adrian',    email: 'adrian@email.com',    age: 21 }
  ];

  $scope.address = {};
  $scope.refreshAddresses = function(address) {
    var params = {address: address, sensor: false};
    return $http.get(
      'http://maps.googleapis.com/maps/api/geocode/json',
      {params: params}
    ).then(function(response) {
      $scope.addresses = response.data.results
    });
  };

  $scope.country = {};
  $scope.countries = [];
  });


WorkoutCtrl.filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});
