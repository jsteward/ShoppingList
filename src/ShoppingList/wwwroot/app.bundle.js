(function () {
    angular.module('shoppinglist', [
        'ngRoute',
        'shoppinglist.controller',
        'shoppinglist.routes',
        'hmTouchEvents',
        'shoppinglist.component.item'
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
    function shoppinglistController() {
        var ctrl = this;
        ctrl.items = [];
        ctrl.newItemName = "";
        
        
        ctrl.addItem = addItem;
        ctrl.removeItem = removeItem;

        init();
        
        function removeItem(item) {
            var index = _.findIndex(ctrl.items, {name:item.name});
            ctrl.items.splice(index, 1);
            
        }

        function addItem() {
            if (ctrl.newItemName !== "" && !_.find(ctrl.items, {name:ctrl.newItemName})) {
                var item = { name: ctrl.newItemName, quantity: '1', notes: '', complete: 'false' };
                ctrl.items.unshift(item);
                ctrl.newItemName = "";
            }
            
        }

        function init() {

            ctrl.items = [
                { name: 'Flour', quantity: '1', notes: '', complete: 'false' },
                { name: 'Rice', quantity: '1', notes: '', complete: 'false' },
                { name: 'Onion', quantity: '1', notes: '', complete: 'false' },
                { name: 'Salt', quantity: '1', notes: '', complete: 'false' },
                { name: 'Eggs', quantity: '1', notes: '', complete: 'false' },
                { name: 'Bacon', quantity: '1', notes: '', complete: 'false' },
                { name: 'Milk', quantity: '1', notes: '', complete: 'false' },
                { name: 'Bread', quantity: '1', notes: '', complete: 'false' },
                { name: 'Bacon', quantity: '1', notes: '', complete: 'false' },
                { name: 'Cheese', quantity: '1', notes: '', complete: 'false' },
                { name: 'Apples', quantity: '1', notes: '', complete: 'false' }
            ];
        }
    }

    angular.module('shoppinglist.controller', [])
        .controller('shoppinglistController', shoppinglistController);
})();
(function () {
    function shoppingListRouteConfiguration($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'views/list/index.html',
            controller: 'shoppinglistController',
            controllerAs: 'ctrl'
        });

        $routeProvider.otherwise("/");
    }

    angular.module('shoppinglist.routes', ['ngRoute'])
        .config(['$routeProvider', shoppingListRouteConfiguration]);
})();
(function () {
    function shoppinglistService () {
        
    }



    angular.module('shoppinglist.service', [$resource])
    .service('shoppinglistService', shoppinglistService);
})();