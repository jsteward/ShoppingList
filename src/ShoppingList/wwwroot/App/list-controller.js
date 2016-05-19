/// <reference path="../../views/values/index.html" />
(function () {
    function shoppinglistController() {
        var ctrl = this;
        ctrl.items = [];
        ctrl.style = {};
        ctrl.newItemName = "";
        
        ctrl.dragEnd = dragEnd;
        ctrl.dragLeft = dragLeft;
        ctrl.addItem = addItem;

        init();
        
        function dragEnd(event, index) {
            var gesture = event.gesture;
            if (gesture.direction === "left" && gesture.distance > 100) {
                ctrl.items.splice(index, 1);

            }
            ctrl.style[index].transform = "translate3d(0,0,0)";
            ctrl.style[index].opacity = 1;
        }

        function dragLeft(event, index) {
            if (!ctrl.style[index]) {
                ctrl.style[index] = {}
            }
            var dist = event.gesture.distance;
            ctrl.style[index].transform = "translate3d(" + (dist * -1) + "px, 0,0)";
            ctrl.style[index].opacity = 1 - ((dist-100) / 100);

        }

        function addItem() {
            if (ctrl.newItemName !== "" && !_.find(ctrl.items, {name:ctrl.newItemName})) {
                var item = { name: ctrl.newItemName, quantity: '1', notes: '', complete: 'false' };
                ctrl.items.push(item);
                ctrl.newItemName = "";
            }
            
        }

        function init() {

            ctrl.items = [
                { name: 'Flour', quantity: '1', notes: '', complete: 'false' },
                { name: 'Rice', quantity: '1', notes: '', complete: 'false' },
                { name: 'Onion', quantity: '1', notes: '', complete: 'false' },
                { name: 'Salt', quantity: '1', notes: '', complete: 'false' }
            ];
        }
    }

    angular.module('shoppinglist.controller', [])
        .controller('shoppinglistController', shoppinglistController);
})();