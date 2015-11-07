angular.module('AngularDemo.BeerController', [])
.controller('BeerCtrl', ['$scope','$http', function ($scope, $http) {
    //$scope.myThingy = "stevenThingy";
    $http.get('/api/Beers').success(function (data) {
        $scope.model= data;
    });
    $scope.states = {
        showBeerForm: false,
        isAdding: false
    };
    $scope.showBeerForm = function (show) {
        $scope.states.showBeerForm = show;
    };

    $scope.new = {
        Beer: {}
    };

    $scope.addNewBeer = function () {
        $scope.states.isAdding = true;
        $http.post('/api/Beers', $scope.new.Beer).success(function (data) {
            $scope.states.isAdding = false;
            $scope.model.push($scope.new.Beer);
            $scope.showBeerForm(false);
            $scope.new.Beer = {};
        });
    };
}]);