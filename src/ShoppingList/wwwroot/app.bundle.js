(function () {
    angular.module('shoppinglist', [
        'ngRoute',
        'ngResource',
        'shoppinglist.controller',
        'shoppinglist.routes',
        'hmTouchEvents',
        'shoppinglist.component.item',
        'shoppinglist.service'
    ]);
})();
(function () {
    function itemController() {
        var ctrl = this;
        ctrl.dragEnd = dragEnd;
        ctrl.dragLeft = dragLeft;
        ctrl.style = {};


        function dragLeft(event) {
            var dist = event.gesture.distance;
            ctrl.style.transform = "translate3d(" + (dist * -1) + "px, 0,0)";
            ctrl.style.opacity = 1 - ((dist - 100) / 100);
        }

        function dragEnd(event) {
            
            var gesture = event.gesture;
            if (gesture.direction === "left" && gesture.distance > 100) {
                ctrl.onDelete({ item: ctrl.item });
            }
            ctrl.style.transform = "translate3d(0,0,0)";
            ctrl.style.opacity = 1;
        }
    }

    angular.module('shoppinglist.component.item', [])
        .component('listItem', {
            templateUrl: 'views/item/index.html',
            controller: itemController,
            bindings: {
                item: '<',
                onDelete:'&'
            }
        });

})();
/// <reference path="../../views/values/index.html" />
(function () {
    function shoppinglistController(shoppinglistService, $routeParams) {
        var ctrl = this;
        ctrl.items = [];
        ctrl.newItemName = "";
        
        
        ctrl.addItem = addItem;
        ctrl.removeItem = removeItem;

        init();
        
        function removeItem(item) {
            

            shoppinglistService.deleteItem(item).then(() => {
                var index = _.findIndex(ctrl.items, { name: item.name });
                ctrl.items.splice(index, 1);
            });

            
            
        }

        function addItem() {

            if (ctrl.newItemName !== "" && !_.find(ctrl.items, {name:ctrl.newItemName})) {
                var item = { name: ctrl.newItemName, quantity: '1', notes: '', complete: 'false', itemListId: $routeParams.itemListId };

                shoppinglistService.addItem(item).then((resp) => {
                    ctrl.items.unshift(resp);
                    ctrl.newItemName = "";
                });

            }
            
        }

        function init() {
            shoppinglistService.getAll(1).then((resp) => {ctrl.items = resp;});
        }
    }

    angular.module('shoppinglist.controller', [])
        .controller('shoppinglistController', shoppinglistController);
})();
(function () {
    function shoppingListRouteConfiguration($routeProvider) {
        $routeProvider.when('/:itemListId', {
            templateUrl: 'views/list/index.html',
            controller: 'shoppinglistController',
            controllerAs: 'ctrl'
        });

        $routeProvider.otherwise("/1");
    }

    angular.module('shoppinglist.routes', ['ngRoute'])
        .config(['$routeProvider', shoppingListRouteConfiguration]);
})();
(function () {

    function shoppinglistService($resource) {
        var svc = this;

        var url = '/api/lists/:itemListId/items/:itemId';
        var settings = { cache: true, isArray: true };

        var resource = $resource(url, { 'itemListId': '@itemListId' }, settings);

        svc.addItem = addItem;

        svc.editItem = editItem;

        svc.deleteItem = deleteItem;

        svc.getAll = getAll;

        //svc.getItem = getItem;

        function addItem(item) {
            return resource.save(item).$promise;
        }

        function editItem(item) {
            
        }

        function deleteItem(item) {
            return resource.delete({ 'itemId': item.id }).$promise;
        }



        function getAll(itemListId) {
            return resource.query({ 'itemListId': itemListId }).$promise;
        }
    }

    angular.module('shoppinglist.service', [])
    .service('shoppinglistService', shoppinglistService);
})();