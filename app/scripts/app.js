var app = angular.module('monitor', ['ngMaterial','ui.router','chart.js']);
app.run(function($rootScope) {
	$rootScope.now = function(){
			var heure =new Date();
			var h=(heure.getHours()<10)?("0"+heure.getHours()):(heure.getHours());
			var m=(heure.getMinutes()<10)?("0"+heure.getMinutes()):(heure.getMinutes());
			var s=(heure.getSeconds()<10)?("0"+heure.getSeconds()):(heure.getSeconds());
			return h+":"+m+":"+s;
	};

});
/*
* Routes for the monitoring system
*/
app.config(['$stateProvider','$urlRouterProvider', monitorRouter]);

function monitorRouter($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state({
			url:'/',
			name : 'home',
			templateUrl: '../views/main.html',
			controller : 'ChartCtrl'
		})
		.state({
			url:'/cpu',
			name : 'cpu',
			templateUrl : '../views/cpu.html'
		})
		.state({
			url:'/memory',
			name : 'memory',
			templateUrl : '../views/memory.html'
		})
		.state({
			url:'/disk',
			name : 'disk',
			templateUrl : '../views/disk.html'
		})
		.state({
			url:'/network',
			name : 'network',
			templateUrl : '../views/network.html'
		});
}

/*
* Routes for analytics system
*/
app.config(['$stateProvider', analyticsRouter]);
function analyticsRouter($stateProvider) {
	$stateProvider
		.state({
			name : 'analytics',
			templateUrl: '../views/analytics/main.html'
		});
}