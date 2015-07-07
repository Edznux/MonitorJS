app.controller('ChartCtrl', ['$scope','$rootScope', '$mdSidenav','socket','api', function($scope,$rootScope, $mdSidenav,socket,api){
	Chart.defaults.global.animation = false;

	$scope.memory = {};
	
	$scope.labels = [];
	$scope.series = [''+$scope.item+" "+$scope.data];


	$scope.data = [
		[]
	];
	// define memory total to  0 
	$scope.memory.total = 0; 

	api.get('memory','total',function(data){
		$scope.memory.total = data;
	});

	setInterval(function(){

		api.get('memory','free',function(data){

			//push fresh data into the graph
			$scope.data[0].push($scope.memory.total-data);
			//push corresponding time 
			$scope.labels.push($rootScope.now());
			
			//drop data if exed 20 points
			if($scope.data[0].length > 20){
				$scope.labels.shift();
				$scope.data[0].shift();
			}

		});

	},2000);

	$scope.onClick = function (points, evt) {
		console.log(points, evt);
	};

}])

.directive('chart', function() {
  return {
    restrict: 'E',
    scope: {
      item: '=item',
      data: '=data',
    },
    controller:"ChartCtrl",

    templateUrl: 'views/partials/chart.html'
  };
})