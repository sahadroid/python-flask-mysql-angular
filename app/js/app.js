'use strict';

var App = angular.module('App', ['ngRoute']);

App.factory('myHttpInterceptor', function($rootScope, $q) {
  return {
    'requestError': function(config) {
      $rootScope.status = 'HTTP REQUEST ERROR ' + config;
      return config || $q.when(config);
    },
    'responseError': function(rejection) {
      $rootScope.status = 'HTTP RESPONSE ERROR ' + rejection.status + '\n' +
                          rejection.data;
      return $q.reject(rejection);
    },
  };
});

App.factory('incidentService', function($rootScope, $http, $q, $log) {
  $rootScope.status = 'Retrieving data...';
  var deferred = $q.defer();
  $http.get('rest/query')
  .success(function(data, status, headers, config) {
    $rootScope.incidents = data;
    deferred.resolve();
    $rootScope.status = '';
  });
  return deferred.promise;
});

App.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller : 'MainCtrl',
    templateUrl: '/partials/main.html',
    resolve    : { 'incidentService': 'incidentService' },
  });
  $routeProvider.when('/invite', {
    controller : 'InsertCtrl',
    templateUrl: '/partials/insert.html',
  });
  $routeProvider.when('/update/:id', {
    controller : 'UpdateCtrl',
    templateUrl: '/partials/update.html',
    resolve    : { 'incidentService': 'incidentService' },
  });
  $routeProvider.otherwise({
    redirectTo : '/'
  });
});

App.config(function($httpProvider) {
  $httpProvider.interceptors.push('myHttpInterceptor');
});

App.controller('MainCtrl', function($scope, $rootScope, $log, $http, $routeParams, $location, $route) {

  $scope.invite = function() {
    $location.path('/invite');
  };

  $scope.update = function(incident) {
    $location.path('/update/' + incident.id);
  };

  $scope.delete = function(incident) {
    $rootScope.status = 'Deleting incident ' + incident.id + '...';
    $http.post('/rest/delete', {'id': incident.id})
     .success(function(data, status, headers, config) {
        for (var i=0; i<$rootScope.incidents.length; i++) {
          if ($rootScope.incidents[i].id == data.id) {
            $rootScope.incidents.splice(i,1);
            break;
          }
        }
      $location.path('/');
      $rootScope.status = '';
    });
  };
});

App.controller('InsertCtrl', function($scope, $rootScope, $log, $http, $routeParams, $location, $route) {

  $scope.submitInsert = function() {
    var incident = {
      severity : $scope.severity,
      category : $scope.category, 
      device : $scope.device, 
      name : $scope.name, 
      status : $scope.status, 
	  starttime : $scope.starttime, 
    };
    $rootScope.status = 'Creating...';
    $http.post('/rest/insert', incident)
    .success(function(data, status, headers, config) {
      $rootScope.incidents.push(data);
      $rootScope.status = '';
    });
    $location.path('/');
  }
});

App.controller('UpdateCtrl', function($routeParams, $rootScope, $scope, $log, $http, $location) {

  for (var i=0; i<$rootScope.incidents.length; i++) {
    if ($rootScope.incidents[i].id == $routeParams.id) {
      $scope.incident = angular.copy($rootScope.incidents[i]);
    }
  }

  $scope.submitUpdate = function() {
    $rootScope.status = 'Updating...';
    $http.post('/rest/update', $scope.incident)
    .success(function(data, status, headers, config) {
      for (var i=0; i<$rootScope.incidents.length; i++) {
        if ($rootScope.incidents[i].id == $scope.incident.id) {
          $rootScope.incidents.splice(i,1);
          break;
        }
      }
      $rootScope.incidents.push(data);
      $rootScope.status = '';
    });
    $location.path('/');
  };

});

