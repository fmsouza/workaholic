// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers'])

.run(function($ionicPlatform, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

    Number.prototype.pad = function(size) {
      var s = String(this);
      while (s.length < (size || 2)) {s = "0" + s;}
      return s;
    };

  $rootScope.parseDate = function(time){
    if(time==null) return 'erro';
    time = new Date(time);
    var day = (time.getDate()).pad(2);
    var month = (time.getMonth() +1).pad(2);
    var year = time.getFullYear();
    return day + '/' + month + '/' + year;
  };

  $rootScope.parseTime = function(time){
    if(time==null) return '00:00';
    time = new Date(time);
    var hours = time.getHours().pad(2);
    var minutes = time.getMinutes().pad(2);
    return hours + ':' + minutes;
  };

  $rootScope.addData = function(data){
    data.dmy = $rootScope.parseDate(data.chegada); console.log(data);
    var exists = $rootScope.getData(data.dmy, $rootScope.data); console.log(exists);
    if(exists<0){
      $rootScope.data.push(data);
    }
    else{
      $rootScope.data[exists] = data;
    }
    window.localStorage.setItem('workaholic', JSON.stringify($rootScope.data));
    $rootScope.data = $rootScope.loadData([]);
  };

  $rootScope.loadData = function(valueType){
    return JSON.parse(window.localStorage.getItem('workaholic')) || valueType;
  }

  $rootScope.today = $rootScope.parseDate(Date.now());

  $rootScope.data = $rootScope.loadData([]);

  $rootScope.getData = function(dmy, data){
    for(var i=0; i<data.length; i++){
      var item = data[i];
      console.log(item.dmy + "==0" + dmy + ": " + (item.dmy === dmy));
      if(item.dmy === dmy) return i;
    }
    return -1;
  };

  $rootScope.getTodayData = function(){
    var today = $rootScope.today;
    for(var i=0; i<$rootScope.data.length; i++){
      var item = $rootScope.data[i];
      if(item.dmy == today) return item;
    }
    return {
      chegada: null,
      almoco: null,
      volta_almoco: null,
      saida: null
    };
  };

  $rootScope.efetivo = function(item){
    var time = (item.saida - item.chegada) - (item.volta_almoco - item.almoco);
    return (new Date(time)).getTime(); // in milisseconds
  };

  $rootScope.formatTime = function(time){
    time = (new Date(time)).getTime(); // in milisseconds
    var seg = time / 1000; // segundos
    var min = seg / 60; // minutos totais
    var hs = min / 60; // horas
    var mf = min % 60;
    return parseInt(hs).pad(2) + ':' + parseInt(mf).pad(2);
  };
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html"
  })

  .state('app.main', {
    url: "/main",
    views: {
      'menuContent': {
        templateUrl: "templates/main.html",
        controller: 'MainCtrl'
      }
    }
  })

  .state('app.history', {
    url: "/history",
    views: {
      'menuContent': {
        templateUrl: "templates/history.html",
        controller: 'HistoryCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/main');
});
