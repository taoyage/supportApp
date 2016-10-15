app.controller('registerCtrl', ['$scope','$http','$location',function($scope,$http,$location) {
	var model = $scope.model = {};
	$scope.register = function(){
		/*post发送数据*/
		// var register = $http.post("http://172.20.10.2:3000/reg",model);
		// var register = $http.post("http://192.168.11.2:3000/reg",model);
		var register = $http.post("/reg",model);
		
		/*发送成功*/
		register.success(function(data){
			/*不正确显示错误信息*/
			if(data.error){
				$scope.errorMsg = data.error;
				console.log(data.error);
			}
			else{
				// $rootScope.credentials.username = data.username;
				$location.path('/login');
				console.log('success');
			}	
		})		
	}	
}]);
