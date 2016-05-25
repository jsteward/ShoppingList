(function () {

    function shoppinglistService($resource) {
        var svc = this;

        var url = '/api/lists/:itemListId/items/:itemId';
        var settings = { cache: true, isArray: true };

        var resource = $resource(url, { 'itemListId': '@itemListId' }, settings);

        svc.addItem = addItem;

        svc.editItem = editItem;

        svc.deleteItem = deleteItem;

        svc.getAll = getAll;

        //svc.getItem = getItem;

        function addItem(item) {
            return resource.save(item).$promise;
        }

        function editItem(item) {
            
        }

        function deleteItem(item) {
            return resource.delete({ 'itemId': item.id }).$promise;
        }



        function getAll(itemListId) {
            return resource.query({ 'itemListId': itemListId }).$promise;
        }
    }

    angular.module('shoppinglist.service', [])
    .service('shoppinglistService', shoppinglistService);
})();