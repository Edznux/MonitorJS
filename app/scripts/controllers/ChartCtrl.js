app.controller('ChartCtrl', ['$scope', '$mdSidenav','socket','api', function($scope, $mdSidenav,socket,api){

	$scope.labels = [];
	$scope.series = ['Free Memory'];
	$scope.data = [
		[]
	];

	setInterval(function(){

		api.get('memory','free',function(data){

			//push fresh data into the graph
			$scope.data[0].push(data);
			//push corresponding time 
			$scope.labels.push($scope.now());
			
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
}]);