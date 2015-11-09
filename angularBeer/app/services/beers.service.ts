module app.services {
    'use strict';

    export interface IBeersService {
        getBeers(): ng.IPromise<Beer[]>;
        addBeer(newBeer: Beer): ng.IPromise<Beer>;
    }

    export class Beer {
        id: string;
        name: string;
        colour: string;
        hasTried: Boolean;
    }

    class BeersService implements IBeersService {
        static $inject = ['$http'];
        constructor(private $http: ng.IHttpService) {
        }
        getBeers(): ng.IPromise<Beer[]> {
            return this.$http.get('/api/Beers')
                .then((response: ng.IHttpPromiseCallbackArg<Beer[]>): any=> {
                    return <Beer[]>response.data;
                });
        }

        addBeer(newBeer:Beer): ng.IPromise<Beer> {
            return this.$http.post('/api/Beers', newBeer)
                .then((response: ng.IHttpPromiseCallbackArg<Beer>): any=> {
                    <Beer>response.data;
                });
        };
    }

    factory.$inject = ['$http'];

    function factory($http: ng.IHttpService) {
        return new BeersService($http);
    }

    angular
        .module('app')
        .factory('app.services.BeersService', factory);
}