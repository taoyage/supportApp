var app = angular.module('app', ['ionic','percentCircle-directive']);

app.run(function($ionicPlatform,$location) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  cordova.plugins.Keyboard.disableScroll(true);

}
if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    //平台、设备和操作系统
    var system = {
      win: false,
      mac: false,
      xll: false,
      ipad:false
    };
        //检测平台
        var p = navigator.platform;
        console.log(p);
        system.win = p.indexOf("Win") == 0;
        system.mac = p.indexOf("Mac") == 0;
        system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
        system.ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false;
        //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
        if (system.win || system.mac || system.xll||system.ipad) {
          alert('Please use a mobile phone to access this page');
          window.location.href = "http://www.google.com";
        } 
        console.log($location);
        console.log(window.location);
        var noSleep = new NoSleep();
        noSleep.enable();

      });
})

app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'registerCtrl'
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'home': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tab.menu', {
    url: '/menu',
    views: {
      'menu': {
        templateUrl: 'templates/menu.html',
        controller: 'menuCtrl'
      }
    }
  })


  .state('tab.user', {
    url: '/user',
    views: {
      'user': {
        templateUrl: 'templates/user.html',
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

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

app.controller('menuCtrl', ['$scope','$ionicSlideBoxDelegate',function($scope,$ionicSlideBoxDelegate) {
	
}]);
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
