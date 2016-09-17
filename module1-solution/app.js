(function () {
  'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope','$filter'];
function LunchCheckController($scope, $filter){
$scope.message ="";
$scope.inputValue ="";

$scope.checkIfTooMuch = function() {
  var stringToSplit = $scope.inputValue;
  var number = stringToSplit.split(',');
  if (number.length <=3)
    $scope.message = "Enjoy!";

  if (number.length >3)
    $scope.message = "Too much!";


};

}

})();
