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
  if(stringToSplit.length == 0)
    $scope.message = "Please enter data first!";
  else
  {
    var array = stringToSplit.split(',');

    var finalNumber = 0;
    for(var i=0; i<array.length;i++)
    {
      if(array[i].length > 0)
        finalNumber++;
    }
    if (finalNumber <=3)
      $scope.message = "Enjoy!";

    if (finalNumber >3)
      $scope.message = "Too much!";
  }


};

}

})();
