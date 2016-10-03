(function () {
  'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");



NarrowItDownController.$inject = ['MenuSearchService',];
function NarrowItDownController(MenuSearchService){
	var narrow = this;
	

	
	narrow.findMenuItems = function (searchTerm) {
    var promise = MenuSearchService.getMatchedMenuItems("A11");

    promise.then(function (response) {
		narrow.foundMenuItems = response;
	
    })
    .catch(function (error) {
      console.log(error);
    })
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

	service.getMatchedMenuItems = function (searchTerm) {
		
		  return $http({    
			method: "GET",
			url: (ApiBasePath)}
			).then(function (result) {
				var filteredItems = [];
				for(var i=0; i<result.data.menu_items.length; i++)
				{
					 if(result.data.menu_items[i].short_name.toLowerCase.Contains(searchTerm.toLowerCase))
					 {
						filteredItems.push(result.data.menu_items[i])
					}
						
				}
				return filteredItems;
			});
	}
}


})();
