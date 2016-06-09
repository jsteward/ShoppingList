(function() {
    function itemListService($resource) {
        var svc = this;
        var url = 'http://localhost:50604/api/lists/:itemListId/items/:itemId';
        var settings = {
            cache: true,
            isArray: true
        };
        var resource = $resource(url, {
            'itemListId': '@itemListId'
        }, {
            update: {}
        }, settings);
        svc.addItem = addItem;
        svc.editItem = editItem;
        svc.deleteItem = deleteItem;
        svc.getAll = getAll;
        //svc.getItem = getItem;
        function addItem(item) {
            return resource.save(item).$promise;
        }

        function editItem(item) {
            console.log(item);
            return resource.update(item).$promise;
        }

        function deleteItem(item) {
            return resource.delete({
                'itemId': item.id
            }).$promise;
        }



        function getAll(itemListId) {
            return resource.query({
                'itemListId': itemListId
            }).$promise;
        }
    }

    angular.module('listr.itemList.service', [])
        .service('itemListService', itemListService);
})();
