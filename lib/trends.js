"use strict";

var utils = require('./utils');

module.exports = function (Twitter) {

    Twitter.prototype.getPlaceTrends = function (id, params, callback) {
        this.get(
            '/trends/place.json',
            utils.merge(
                params,
                {
                    id: id
                }
            ),
            callback
        );
    };

    Twitter.prototype.getAvailableTrends = function (params, callback) {
        this.get(
            '/trends/available.json',
            params,
            callback
        );
    };

    Twitter.prototype.getClosestTrends = function (lat, long, params, callback) {
        this.get(
            '/trends/closest.json',
            utils.merge(
                params,
                {
                    lat: lat,
                    long: long
                }
            ),
            callback
        );
    };

};
