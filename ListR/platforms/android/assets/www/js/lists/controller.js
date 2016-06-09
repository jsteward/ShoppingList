angular.module('listr.lists.controller',[])
  .controller('ListsCtrl',['$scope',function($scope){
    $scope.lists = [
      { title: 'Shopping', id: 1 }
    ];

  }]);
