/// <reference path="../../views/values/index.html" />
(function () {
    function shoppinglistController(shoppinglistService, $routeParams) {
        var ctrl = this;
        ctrl.items = [];
        ctrl.newItemName = "";
        
        
        ctrl.addItem = addItem;
        ctrl.quickAddItem = quickAddItem;
        ctrl.removeItem = removeItem;
        ctrl.updateItem = updateItem;

        init();
        
        function removeItem(item) {
            shoppinglistService.deleteItem(item).then(() => {
                var index = _.findIndex(ctrl.items, { name: item.name });
                ctrl.items.splice(index, 1);
            });
        }

        function quickAddItem() {
            if (ctrl.newItemName !== "" && !_.find(ctrl.items, { name: ctrl.newItemName })) {
                var item = { name: ctrl.newItemName, quantity: '1', notes: '', complete: 'false', itemListId: $routeParams.itemListId };
                ctrl.addItem(item);
            }

        }

        function addItem(item) {
            shoppinglistService.addItem(item).then((resp) => {
                ctrl.items.unshift(resp);
                ctrl.newItemName = "";
            });
            
        }

        function updateItem(item) {
            shoppinglistService.editItem(item);
            
        }

        function init() {
            shoppinglistService.getAll(1).then((resp) => {ctrl.items = resp;});
        }
    }

    angular.module('shoppinglist.controller', [])
        .controller('shoppinglistController', shoppinglistController);
})();