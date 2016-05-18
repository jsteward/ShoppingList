/// <reference path="../../views/values/index.html" />
(function () {
    function shoppinglistController() {
        var ctrl = this;
        ctrl.items = [];


        init();
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