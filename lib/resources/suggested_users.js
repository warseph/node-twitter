"use strict";

var utils = require('../utils');

module.exports = function (Twitter) {

    Twitter.prototype.getSuggestedUser = function (slug, params, callback) {
        this.get(
            '/users/suggestions/' + utils.escape(slug) + '.json',
            params,
            callback
        );
    };

    Twitter.prototype.getSuggestedUsers = function (params, callback) {
        this.get(
            '/users/suggestions.json',
            params,
            callback
        );
    };

    Twitter.prototype.getSuggestedUsersMembers = function (slug, params, callback) {
        this.get(
            '/users/suggestions/' + utils.escape(slug) + '/members.json',
            params,
            callback
        );
    };


};
