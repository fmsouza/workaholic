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

    $scope.dezHoras = 36000000;

    $scope.oitoHoras = 28800000;

    $scope.seisHoras = 21600000;

    $scope.quatroHoras = 14400000;

    $scope.history = $rootScope.data;

    $scope.iAmValue = false;

    $scope.whatIAm = function(){
    if(!$scope.iAmValue){
        var tam = $scope.history.length;
        var total = 0;
        for(var i=0; i<tam; i++){
            total += $rootScope.efetivo($scope.history[i]);
        }
        $scope.iAmValue = total/tam;
    }
    return $scope.iAmValue;
    }
});
