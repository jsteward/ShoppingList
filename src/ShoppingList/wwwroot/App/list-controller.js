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