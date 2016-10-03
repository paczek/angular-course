(function () {
  'use strict';

angular.module('dia', [])
.controller('dic', dic)
.filter('loves', LovesFilter)
.filter('truth', TruthFilter);
dic.$inject = ['$scope','lovesFilter'];
function dic($scope, lovesFilter){
$scope.name ="paczek";
$scope.state ="hungry"
$scope.cookieCost = .45;

$scope.sayMessage = function() {
  var msg = "dupadupa";

  return msg;
};

$scope.sayLovesMessage = function() {
  var msg = "dupadupa";
  msg = lovesFilter(msg);

  return msg;
};

}

function LovesFilter() {
return function(input){
  input = input || "";
  input = input.replace("dupa", "dupka");
  return input;
};
}

function TruthFilter()
{
  return function (input,target, replace){
    input = input || "";
    input = input.replace(target, replace);
    return input;
  };
}



})();
