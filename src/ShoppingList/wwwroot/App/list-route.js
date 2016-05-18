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