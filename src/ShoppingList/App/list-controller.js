(function () {
    'use strict';

    angular
        .module('app')
        .controller('list_controller', list_controller);

    list_controller.$inject = ['$location']; 

    function list_controller($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'list_controller';

        activate();

        function activate() { }
    }
})();
