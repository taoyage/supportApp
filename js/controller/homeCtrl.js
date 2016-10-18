app.controller('homeCtrl', ['$scope','$timeout','$location','$window','$interval',function($scope,$timeout,$location,$window,$interval) {
	$scope.percent = -1;

	document.addEventListener('visibilitychange',function(){
		if(document.hidden){
			socket.disconnect();
		}
		else{
			$location.path('/login');
		}
	});

	$interval(function() {
      // $window.$location = $window.$location;
      $window.location.reload($window.stop);
      $window.setTimeout($window.stop, 0);
      console.log(1);
  }, 15000);
	


	$scope.changePercent = function() { 

		$timeout( function(){ $scope.changePercent(); }, 54000);
		$scope.percent ++;

	}

}]);