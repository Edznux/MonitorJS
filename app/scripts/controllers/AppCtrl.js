app.controller('AppCtrl', ['$scope', '$mdSidenav','socket', function($scope, $mdSidenav,socket){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  socket.start();

  socket.on('clients', function (data){
    $scope.systemTime = data.heure;
    $scope.connected = data.clients;
  });

}]);