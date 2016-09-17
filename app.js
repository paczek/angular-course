(function () {
  'use strict';

angular.module('dia', [])
.controller('dic', dic);
dic.$inject = ['$scope','$filter'];
function dic($scope, $filter){
$scope.name ="paczek";
$scope.state ="hungry"
$scope.upper = function() {
  var upCase = $filter('uppercase');
  $scope.name = upCase($scope.name);
};

$scope.feed = function() {
  $scope.state = "fed";
};

}

function am(name, job, blah)
{
  return "blah";
}

})();
