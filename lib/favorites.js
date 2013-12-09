"use strict";

var utils = require('./utils');

module.exports = function (Twitter) {

    Twitter.prototype.getFavorites = function (params, callback) {
        this.get(
            '/favorites/list.json',
            params,
            callback
        );
    };

    Twitter.prototype.destroyFavorite = function (id, params, callback) {
        this.post(
            '/favorites/destroy/' + utils.escape(id) + '.json',
            params,
            null,
            callback
        );
    };

    Twitter.prototype.createFavorite = function (id, params, callback) {
        this.post(
            '/favorites/create/' + utils.escape(id) + '.json',
            params,
            null,
            callback
        );
    };

};
