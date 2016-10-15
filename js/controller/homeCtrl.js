app.controller('homeCtrl', ['$scope','$timeout','$location',function($scope,$timeout,$location) {
	$scope.percent = -1;

	document.addEventListener('visibilitychange',function(){
		if(document.hidden){
			alert('だめ');
		}
		else{
			$location.path('/login');
			socket.disconnect();
		}
	});

	


	$scope.changePercent = function() { 

		$timeout( function(){ $scope.changePercent(); }, 54000);
		$scope.percent ++;

	}

}]);