var app = angular.module('app', ['ionic','percentCircle-directive']);

app.run(function($ionicPlatform,$location,$window,$interval) {
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

    // //平台、设备和操作系统
    // var system = {
    //   win: false,
    //   mac: false,
    //   xll: false,
    //   ipad:false
    // };
    //     //检测平台
    //     var p = navigator.platform;
    //     console.log(p);
    //     system.win = p.indexOf("Win") == 0;
    //     system.mac = p.indexOf("Mac") == 0;
    //     system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    //     system.ipad = (navigator.userAgent.match(/iPad/i) != null)?true:false;
    //     //跳转语句，如果是手机访问就自动跳转到wap.baidu.com页面
    //     if (system.win || system.mac || system.xll||system.ipad) {
    //       alert('Please use a mobile phone to access this page');
    //       window.location.href = "http://www.google.com";
    //     } 


  });
})