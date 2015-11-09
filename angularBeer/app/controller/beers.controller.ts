module app.beers {
    'use strict';

    import Beer = app.services.Beer;

    interface IBeersScope {
        Beers: Beer[];
        newBeer: Beer;
        showBeer: Boolean;

        getBeers(): ng.IPromise<Beer[]>;
        addBeer(newBeer: Beer): ng.IPromise<Beer>;
        showBeerForm(showBeer: Boolean): void;
    }



    class BeersController implements IBeersScope {
        Beers: Beer[];
        newBeer: Beer;
        showBeer: Boolean;

        static $inject = ['$http', 'app.services.BeersService'];

        constructor(private $http: ng.IHttpService, private beersService: services.IBeersService) {
            this.getBeers();
            this.showBeer = false;
        }

        getBeers(): ng.IPromise<Beer[]> {
            return this.beersService.getBeers()
                .then((data: ng.IHttpPromiseCallbackArg<Beer[]>): any=> {
                    this.Beers = <Beer[]>data;
                });

        };

        addBeer(nb): ng.IPromise<Beer> {
            return this.beersService.addBeer(nb)
                .then((response: ng.IHttpPromiseCallbackArg<Beer>): any=> {
                    this.showBeer = false;
                    this.Beers.push(nb);
                    this.newBeer = <any>{};
                });

        };
        showBeerForm(showBeer: Boolean): void {
            this.showBeer = showBeer;
        };
    }

    angular
        .module('app')
        .controller('app.beers.BeersController', BeersController);

}