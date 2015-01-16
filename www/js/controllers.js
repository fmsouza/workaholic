angular.module('app.controllers', [])

.controller('MainCtrl', function($scope, $rootScope) {

      $scope.dados = $rootScope.getTodayData();

      $scope.cheguei = function(){
        $scope.dados.chegada = Date.now();
      };

      $scope.pausaAlmoco = function(){
        $scope.dados.almoco = Date.now();
      };

      $scope.volteiAlmoco = function(){
        $scope.dados.volta_almoco = Date.now();
      };

      $scope.fuiEmbora = function(){
        $scope.dados.saida = Date.now();
        $scope.save($scope.dados);
      };

      $scope.save = function(data){
        $rootScope.addData(data);
      };
})

.controller('HistoryCtrl', function($scope, $rootScope) {
      $scope.history = $rootScope.data;

      $scope.iAmValue = false;

      $scope.whatIAm = function(){
        if(!$scope.iAmValue){
          var tam = $scope.history.length;
          var total = 0;
          for(var i=0; i<tam; i++){
            total += $rootScope.efetivo($scope.history[i]);
          }
          console.log(total);
          var media = total/tam;
          console.log(media);
          $scope.iAmValue = media;
        }
        // 10hs = 36000000
        // 8hs = 28800000
        // 6hs = 21600000
        // 4hs = 14400000
        return $scope.iAmValue;
      }
});
