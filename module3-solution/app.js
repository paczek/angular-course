(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundList', FoundListDirective)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");


    function FoundListDirective() {
        var ddo = {
            templateUrl: 'foundList.html',
            scope: {
                items: '<',
                onRemove: '&'
            }
        };

        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var narrow = this;
        var errorMessage = "";
        var firstCallExecuted = false;

        narrow.getItems = function() {
            return MenuSearchService.getItems();
        };

        narrow.isFoundItemsListEmpty = function() {
            return MenuSearchService.getItems().length === 0;
        };

        narrow.getRidOfItem = function(item) {
            MenuSearchService.getRidOfItem(item);
        };

        narrow.findMenuItems = function(searchTerm) {
            narrow.firstCallExecuted = true;
            if (searchTerm === undefined || searchTerm.length === 0) {

                return;
            }

            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            promise.catch(function(error) {
                    console.log(error);
                })
        };
    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath']

    function MenuSearchService($http, ApiBasePath) {
        var service = this;
        var found = [];

        service.getItems = function() {
            return found;
        };
        service.getMatchedMenuItems = function(searchTerm) {

            found = [];
            var response = $http({
                method: "GET",
                url: (ApiBasePath)

            }).then(function(result) {

                for (var i = 0; i < result.data.menu_items.length; i++) {
                    if (result.data.menu_items[i].name.indexOf(searchTerm) !== -1) {
                        found.push(result.data.menu_items[i])
                    }
                }

            });

            return response;

        };

        service.getRidOfItem = function(index) {
            found.splice(index, 1);
        };

    }



})();
