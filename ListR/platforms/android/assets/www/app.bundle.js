// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('listr', ['ionic', 'starter.controllers', 'listr.lists', 'listr.itemList', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.lists', {
      url: '/lists',
      views: {
        'menuContent': {
          templateUrl: 'templates/lists.html',
          controller: 'ListsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/list/:listId',
    views: {
      'menuContent': {
        templateUrl: 'templates/list.html',
        controller: 'ListCtrl as listCtrl',
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/lists');
});

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

// .controller('ListsCtrl', listCtrl)

// .controller('listCtrl', function($scope, $stateParams) {
//   $scope.items = [
//     { name: 'Tomatoes', id: 1, quantity:2 },
//     { name: 'Bread', id: 2, quantity:2 },
//     { name: 'Milk', id: 3, quantity:2 },
//     { name: 'Butter', id: 4, quantity:2 },
//     { name: 'Salt', id: 5, quantity:2 },
//     { name: 'Mayonaise', id: 6, quantity:2 },
//     { name: 'Tomatoes', id: 1, quantity:2 },
//     { name: 'Bread', id: 2, quantity:2 },
//     { name: 'Milk', id: 3, quantity:2 },
//     { name: 'Butter', id: 4, quantity:2 },
//     { name: 'Salt', id: 5, quantity:2 },
//     { name: 'Mayonaise', id: 6, quantity:2 }
//   ];
//
// });





// function listCtrl($scope) {
//     $scope.lists = [
//       { title: 'Shopping', id: 1 }
//     ];
// }

// Platform specific overrides will be placed in the merges folder versions of this file
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

angular.module('listr.itemList',['listr.itemList.controller', 'listr.itemList.service']);

(function() {
    function itemListService($resource) {
        var svc = this;
        var url = 'http://localhost:50604/api/lists/:itemListId/items/:itemId';
        var settings = {
            cache: true,
            isArray: true
        };
        var resource = $resource(url, {
            'itemListId': '@itemListId'
        }, {
            update: {}
        }, settings);
        svc.addItem = addItem;
        svc.editItem = editItem;
        svc.deleteItem = deleteItem;
        svc.getAll = getAll;
        //svc.getItem = getItem;
        function addItem(item) {
            return resource.save(item).$promise;
        }

        function editItem(item) {
            console.log(item);
            return resource.update(item).$promise;
        }

        function deleteItem(item) {
            return resource.delete({
                'itemId': item.id
            }).$promise;
        }



        function getAll(itemListId) {
            return resource.query({
                'itemListId': itemListId
            }).$promise;
        }
    }

    angular.module('listr.itemList.service', [])
        .service('itemListService', itemListService);
})();

angular.module('listr.lists.controller',[])
  .controller('ListsCtrl',['$scope',function($scope){
    $scope.lists = [
      { title: 'Shopping', id: 1 }
    ];

  }]);

angular.module('listr.lists',['listr.lists.controller']);
