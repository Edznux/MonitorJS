app.controller('AppCtrl', ['$scope','$rootScope', '$mdSidenav','socket', function($scope,$rootScope, $mdSidenav,socket){

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