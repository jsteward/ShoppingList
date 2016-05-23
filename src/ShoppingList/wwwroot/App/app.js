(function () {
    angular.module('shoppinglist', [
        'ngRoute',
        'shoppinglist.controller',
        'shoppinglist.routes',
        'hmTouchEvents',
        'shoppinglist.component.item'
    ]);
})();