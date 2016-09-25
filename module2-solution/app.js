(function () {
  'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.controller('ToBuyShoppingController', ToBuyShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService',];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService){
	var boughtList = this;
	boughtList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
}

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService',];
function ToBuyShoppingController(ShoppingListCheckOffService){
	var toBuyList = this;
	toBuyList.toBuyItems = ShoppingListCheckOffService.getToBuyItems();

	toBuyList.buyItem = function (itemIndex, itemName, itemQuantity) {
		ShoppingListCheckOffService.buyItem(itemIndex, itemName, itemQuantity);
	};
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsToBuy = [{name: "Tomatoes", quantity: "2"}, {name: "Potatoes", quantity: "5"}, {name: "Iron mans", quantity: "3"}, {name: "Chaos bringer", quantity: "6"},{name: "Steam accounts", quantity: "2"},];
  var itemsBought = [];

	service.buyItem = function (itemIndex, itemName, quantity) {
		itemsToBuy.splice(itemIndex, 1);
		var item = {
			name: itemName,
			quantity: quantity
		};
		itemsBought.push(item);
	};
  
  service.getToBuyItems = function () {
    return itemsToBuy;
  };
  
  service.getBoughtItems = function () {
    return itemsBought;
  };
}

})();
