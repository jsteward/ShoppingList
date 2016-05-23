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