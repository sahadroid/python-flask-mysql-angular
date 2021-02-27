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

App.factory('userService', function($rootScope, $http, $q, $log) {
  $rootScope.status = 'Retrieving data...';
  var deferred = $q.defer();
  $http.get('rest/query')
  .success(function(data, status, headers, config) {
    $rootScope.users = data;
    deferred.resolve();
    $rootScope.status = '';
  });
  return deferred.promise;
});

App.config(function($routeProvider) {
  $routeProvider.when('/', {
    controller : 'MainCtrl',
    templateUrl: '/partials/main.html',
    resolve    : { 'userService': 'userService' },
  });
  $routeProvider.when('/invite', {
    controller : 'InsertCtrl',
    templateUrl: '/partials/insert.html',
  });
  $routeProvider.when('/update/:id_users', {
    controller : 'UpdateCtrl',
    templateUrl: '/partials/update.html',
    resolve    : { 'userService': 'userService' },
  });
  
  $routeProvider.when('/loguser/:id_users', {
    controller : 'UpdateCtrl',
    templateUrl: '/partials/loguser.html',
    resolve    : { 'userService': 'userService' },
  });
  
  $routeProvider.otherwise({
    redirectTo : '/'
  });
});

App.config(function($httpProvider) {
  $httpProvider.interceptors.push('myHttpInterceptor');
});

App.controller('MainCtrl', function($scope, $rootScope, $log, $http, $routeParams, $location, $route) {
  $scope.inprogress = function() {
    alert("in development..");
	return;
  }; 
   
   $scope.logsubscribe = function(user) {
    $location.path('/loguser/' + user.id_users);
	return;
  };  
  
  $scope.invite = function() {
    $location.path('/invite');
  };    

  $scope.update = function(user) {
    $location.path('/update/' + user.id_users);
  };


  $scope.check_box = function(user,x) {
    $rootScope.status = 'Update Subscribe ' + user.id_users + '...';

    $http.post('/rest/logsubscribe', {'id_users': user.id_users,'periode': x})
     .success(function(data, status, headers, config) {
		 /*
        for (var i=0; i<$rootScope.users.length; i++) {
          if ($rootScope.users[i].id_users == data.id_users) {
            $rootScope.users.splice(i,1);
            break;
          }
        }
		*/
      $location.path('/');
      $rootScope.status = '';
    });
	
  };

  $scope.delete = function(user) {
    $rootScope.status = 'Deleting user ' + user.id_users + '...';
    $http.post('/rest/delete', {'id_users': user.id_users})	
     .success(function(data, status, headers, config) {
        for (var i=0; i<$rootScope.users.length; i++) {
          if ($rootScope.users[i].id_users == data.id_users) {
            $rootScope.users.splice(i,1);
            break;
          }
        }
      $location.path('/');
      $rootScope.status = '';
    });
  };
});

App.controller('InsertCtrl', function($scope, $rootScope, $log, $http, $routeParams, $location, $route) {

  $scope.backtoindex = function() {
    $location.path('/');
  };	
	
  $scope.submitInsert = function() {
	  
    var user = {
      fullname : $scope.fullname,
      phone : $scope.phone, 
      email : $scope.email,
    };
    $rootScope.status = 'Creating...';
    $http.post('/rest/insert', user)
    .success(function(data, status, headers, config) {
      $rootScope.users.push(data);
      $rootScope.status = '';
    });
    $location.path('/');
  }
});

App.controller('UpdateCtrl', function($routeParams, $rootScope, $scope, $log, $http, $location) {

  $scope.backtoindex = function() {
    $location.path('/');
  };
  
  for (var i=0; i<$rootScope.users.length; i++) {
    if ($rootScope.users[i].id_users == $routeParams.id_users) {
      $scope.user = angular.copy($rootScope.users[i]);
    }
  }

  $scope.submitUpdate = function() {
    $rootScope.status = 'Updating...';
    $http.post('/rest/update', $scope.user)
    .success(function(data, status, headers, config) {
      for (var i=0; i<$rootScope.users.length; i++) {
        if ($rootScope.users[i].id_users == $scope.user.id_users) {
          $rootScope.users.splice(i,1);
          break;
        }
      }
      $rootScope.users.push(data);
      $rootScope.status = '';
    });
    $location.path('/');
  };

});

