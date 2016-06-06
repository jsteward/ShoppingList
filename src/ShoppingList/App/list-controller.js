(function (window, angular, undefined) {
    angular.module('shoppinglist', ['shoppinglist.controller',
    'shoppinglist.routes']);
})();

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

    angular.module('shoppinglist.shoppinglistController', [])
        .controller('shoppinglistController', shoppinglistController);
})();


function shoppingListRouteConfiguration($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/index.html',
        controller: 'shoppinglistController',
        controllerAs: 'ctrl'
    });
}

angular.module('shoppinglist.routes', [])
    .config(['$routeProvider', shoppingListRouteConfiguration]);
