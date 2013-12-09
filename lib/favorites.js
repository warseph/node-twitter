/*global escape: true */
"use strict";

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
            '/favorites/destroy/' + escape(id) + '.json',
            params,
            null,
            callback
        );
    };

    Twitter.prototype.createFavorite = function (id, params, callback) {
        this.post(
            '/favorites/create/' + escape(id) + '.json',
            params,
            null,
            callback
        );
    };

};
