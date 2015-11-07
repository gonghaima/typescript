/// <reference path="F:\temp\temp\angularBeer\angularBeer\Scripts/angular.js" />
angular.module('app', ["AngularDemo.BeerController"])
.directive('loadingButton', function () {
    return {
        restrict: 'A',
        scope: {
            spin:'='
        },
        link: function (scope, element, attrs) {
            $(element).ladda();
            scope.$watch('spin', function (newValue, oldValue) {
                if (newValue) {
                    $(element).ladda('start');
                } else {
                    $(element).ladda('stop');
                }
            });
        }
    };
});