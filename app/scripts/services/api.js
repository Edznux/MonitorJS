app.factory('api', function ($rootScope,$http) {

  return {
    get : function(type,item,callback){
      $http.get('/api/raw/'+type+"/"+item).
      success(function(data, status, headers, config) {
        callback(data);
      }).
      error(function(data, status, headers, config) {
        console.log("Error while fetching : "+ type + "/" + item +" data api");
        console.log(data);
        console.log(status);
      });
    }
  };
});