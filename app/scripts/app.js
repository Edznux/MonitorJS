var app = angular.module('monitor', ['ngMaterial','ui.router']);

app.config(['$stateProvider', monitorRouter]);

function monitorRouter($stateProvider) {
	$stateProvider
		.state({
			name : 'home',
			templateUrl: '../views/main.html'
		})
		.state({
			name : 'cpu',
			templateUrl : '../views/cpu.html'
		})
		.state({
			name : 'memory',
			templateUrl : '../views/memory.html'
		})
		.state({
			name : 'disk',
			templateUrl : '../views/disk.html'
		})
		.state({
			name : 'network',
			templateUrl : '../views/network.html'
		})
};

app.config(['$stateProvider', analyticsRouter]);
function analyticsRouter($stateProvider) {
	$stateProvider
		.state({
			name : 'analytics',
			templateUrl: '../views/analytics/main.html'
		})
};