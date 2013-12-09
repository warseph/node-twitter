"use strict";

var utils = require('./utils');

module.exports = function (Twitter) {

    Twitter.prototype.search = function (q, params, callback) {
        if (typeof params === 'function') {
            callback = params;
            params = null;
        }

        if (typeof callback !== 'function') {
            throw "FAIL: INVALID CALLBACK.";
        }

        this.get(
            this.options.search_base + '/tweets.json',
            utils.merge(params, {q: q}),
            callback
        );

        return this;
    };

};
