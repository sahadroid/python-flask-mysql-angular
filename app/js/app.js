'use strict';
//var app_pdf = angular.module('pdfDemo', []);
//var controller = app_pdf.controller('pdfCtrl', pdfController);
  
var App = angular.module('App', ['ngRoute']);
//var controller = App.controller('pdfCtrl', pdfController);



	App.factory('myHttpInterceptor', function($rootScope, $q) {
		return {
			'requestError': function(config) {
				$rootScope.status = 'HTTP REQUEST ERROR ' + config;
				return config || $q.when(config);
			},
			'responseError': function(rejection) {
				$rootScope.status = 'HTTP RESPONSE ERROR ' + rejection.status + '\n' + rejection.data;
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

	App.config(function($routeProvider){
		$routeProvider.when('/', {
			controller : 'MainCtrl',
			templateUrl: '/partials/main.html',
			resolve    : { 'userService': 'userService' },
		});
		
		/*
		$routeProvider.when('/previewpdf', {
			controller : 'MainCtrl',
			templateUrl: '/partials/previewpdf.html',
			resolve    : { 'userService': 'userService' },
		});		
		*/
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
		$('#fromdate,#todate').attr("readonly",true);
		$('#fromdate,#todate').addClass("bg-white");
		$('#fromdate,#todate').datepicker({
			weekStart: 1,
			daysOfWeekHighlighted: "6,0",
			autoclose: true,
			todayHighlight: true,
		});
		$('#fromdate,#todate').datepicker("setDate", new Date());		
		
		$scope.useractive = function(user, sts) {
			$rootScope.status = 'Update Subscribe ' + user.id_users + '...';		
			$http.post('/rest/subscribeactive', {'id_users': user.id_users,'status': sts})
			.success(function(data, status, headers, config) {
				if ($(".btn_active_"+user.id_users).hasClass("btn-success")) {
					$(".btn_active_"+user.id_users).removeClass("btn-success").addClass("btn-danger");
					$(".fa_active_"+user.id_users).removeClass("fa-user-check").addClass("fa-user-slash");						
					$(".tr_active_"+user.id_users).removeClass("table-white").addClass("table-danger");										
					$(".btn_visible_"+user.id_users).removeClass("visible").addClass("invisible");										
				} else {
					$(".btn_active_"+user.id_users).removeClass("btn-danger").addClass("btn-success");
					$(".fa_active_"+user.id_users).removeClass("fa-user-slash").addClass("fa-user-check");										
					$(".tr_active_"+user.id_users).removeClass("table-danger").addClass("table-white");	
					$(".btn_visible_"+user.id_users).removeClass("invisible").addClass("visible");
				}
				$rootScope.status = '';			
			});
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

		$scope.inprogress = function(dt) {
			alert("Report To Email");
		};

		$scope.previewpdf = function() {
			
			var docDefinition = {
			  content: [
				{text: 'INCIDENT SUMMARY'},
				{text: '\n'},	
				{text: $('#fromdate').val() + " - " + $('#todate').val()},
				{text: '\n\n'},				
				{
				  style: 'CanopyReport',
				  table: {
					widths: ['*', '*', '*', '*'],
					body: [
					  [
					  {text: ' ', style: 'header'}, 
					  {text: ' ', style: 'header'},
					  {text: ' ', style: 'header'}
					  ],
					  [' ', ' ', ' '],
					  [' ', ' ', ' '],
					  [' ', ' ', ' ']
					]
				  }
				}
			  ],
			  styles: {
				header: {
				  bold: true,
				  color: '#000',
				  fontSize: 11
				},
				CanopyReport: {
				  color: '#666',
				  fontSize: 10
				}
			  }
			};
			pdfMake.createPdf(docDefinition).open();
			return;
		};

		$scope.check_box = function(user, periode, sts) {
			$rootScope.status = 'Update Subscribe ' + user.id_users + '...';		
			$http.post('/rest/logsubscribe', {'id_users': user.id_users,'periode': periode,'status': sts})
			.success(function(data, status, headers, config) {
				if(periode == "weekly"){
					if ($(".btn_weekly_"+user.id_users).hasClass("btn-secondary")) {
						$(".btn_weekly_"+user.id_users).removeClass("btn-secondary").addClass("btn-success")
						$(".fa_weekly_"+user.id_users).removeClass("fa-bell-slash").addClass("fa-bell")				
					} else {
						$(".btn_weekly_"+user.id_users).removeClass("btn-success").addClass("btn-secondary")
						$(".fa_weekly_"+user.id_users).removeClass("fa-bell").addClass("fa-bell-slash")
					}
				} else {
					if ($(".btn_monthly_"+user.id_users).hasClass("btn-secondary")) {
						$(".btn_monthly_"+user.id_users).removeClass("btn-secondary").addClass("btn-success")
						$(".fa_monthly_"+user.id_users).removeClass("fa-bell-slash").addClass("fa-bell")				
					} else {
						$(".btn_monthly_"+user.id_users).removeClass("btn-success").addClass("btn-secondary")
						$(".fa_monthly_"+user.id_users).removeClass("fa-bell").addClass("fa-bell-slash")
					}			
				}
				$rootScope.status = '';			
			});
		};

		$scope.delete = function(user) {
			var _confirm = confirm("Are You Sure To Delete This Record \n User ID : " + user.id_users +"?");
			if(_confirm){			
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
			}
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
			$rootScope.users.unshift(data);
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
				$rootScope.users.unshift(data);
				$rootScope.status = '';				
			});
			$location.path('/');
		};

	});


