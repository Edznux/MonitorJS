app.controller('AppCtrl', ['$scope', '$mdSidenav','socket', function($scope, $mdSidenav,socket){
	$scope.now = function(){
			var heure =new Date();
			var h=(heure.getHours()<10)?("0"+heure.getHours()):(heure.getHours());
			var m=(heure.getMinutes()<10)?("0"+heure.getMinutes()):(heure.getMinutes());
			var s=(heure.getSeconds()<10)?("0"+heure.getSeconds()):(heure.getSeconds());
			return h+":"+m+":"+s;
	};

  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  /**
  * Start timer of sockets
  */
  socket.start();

  /**
  * Get socket on channel "clients" and set hour, number of connected clients on UI
  */
  socket.on('clients', function (data){
    $scope.systemTime = data.heure;
    $scope.connected = data.clients;
  });

}]);