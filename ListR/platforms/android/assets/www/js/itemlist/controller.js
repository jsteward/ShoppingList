angular.module('listr.itemList.controller',[])
.controller('ListCtrl', function($scope, $stateParams, itemListService) {
  let ctrl = this;

  // ctrl.items = [
  //   { name: 'Tomatoes', id: 1, quantity:2 },
  //   { name: 'Bread', id: 2, quantity:2 },
  //   { name: 'Milk', id: 3, quantity:2 },
  //   { name: 'Butter', id: 4, quantity:2 },
  //   { name: 'Salt', id: 5, quantity:2 },
  //   { name: 'Mayonaise', id: 6, quantity:2 },
  //   { name: 'Tomatoes', id: 1, quantity:2 },
  //   { name: 'Bread', id: 2, quantity:2 },
  //   { name: 'Milk', id: 3, quantity:2 },
  //   { name: 'Butter', id: 4, quantity:2 },
  //   { name: 'Salt', id: 5, quantity:2 },
  //   { name: 'Mayonaise', id: 6, quantity:2 }
  // ];

  init(); 

  function init() {
            itemListService.getAll(1).then((resp) => {ctrl.items = resp;});
        }



});
