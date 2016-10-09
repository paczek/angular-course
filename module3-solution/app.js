(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundListDirective)
        .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");


    function FoundListDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
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
            MenuSearchService.clearItems();
            if (searchTerm === undefined || searchTerm.length === 0) {
                return;
            }

            var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

            promise
            .catch(function(error) {
                    console.log(error);
                })
        };
    }


    MenuSearchService.$inject = ['$http', 'ApiBasePath', '$filter']

    function MenuSearchService($http, ApiBasePath, $filter) {
        var service = this;
        var found = [];

        service.clearItems = function() {
            found.length = 0;
        };

        service.getItems = function() {
            return found;
        };
        service.getMatchedMenuItems = function(searchTerm) {


            var response = $http({
                method: "GET",
                url: (ApiBasePath)

            }).then(function(result) {
                found.length = 0;
                for (var i = 0; i < result.data.menu_items.length; i++) {
                    var nameToLowerCase = $filter('lowercase')(result.data.menu_items[i].description);
                    if (nameToLowerCase.indexOf(searchTerm) !== -1) {
                        found.push(result.data.menu_items[i])
                    }
                }
            })
            .catch(function(error) {
                    console.log(error);
                });

            return response;

        };

        service.getRidOfItem = function(index) {
            found.splice(index, 1);
        };

    }



})();
