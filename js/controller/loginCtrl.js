app.controller('loginCtrl', ['$scope','$http','$location','$interval',function($scope,$http,$location,$interval) {
	var model = $scope.model = {};
	var date;
	var newTime;
	var oldTime;
	
	$scope.login = function(){
		/*post发送数据*/
		// var login = $http.post("http://172.20.10.2:3000/login",model);
		// var login = $http.post("http://192.168.11.2:3000/login",model);
		var login = $http.post("/login",model);
		/*发送成功*/
		login.success(function(data){
			/*不正确显示错误信息*/
			if(data.error){
				$scope.errorMsg = data.error;
				console.log(data.error);
			}
			else{
				var login_date = {
					year : new Date().getFullYear(),
					time : new Date().toLocaleTimeString(),
					month : new Date().getMonth()+1,
					day : new Date().getDate()
				}

				socket.emit('new user',model.username,model.lesson,login_date);
				socket.emit('logined',model.username,model.lesson,login_date);

				$location.path('/tab/home');

				//计算时间差
				$interval(function(){
					date = new Date();
					newTime = date.getTime()/1000;
					if(newTime - oldTime > 5){
						$location.path('/login');
						socket.disconnect();
					}
					oldTime = newTime;
				},1000);

				window.plugins.insomnia.keepAwake();

			}
		});	
	};
}]);
