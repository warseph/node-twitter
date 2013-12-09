"use strict";

module.exports = function (Twitter) {

    Twitter.prototype.reportSpam = function (id, callback) {
        var params = {};
        if (typeof id === 'object') {
            params = id;
        } else if (typeof id === 'string') {
            params.screen_name = id;
        } else {
            params.user_id = id;
        }

        this.post(
            '/report_spam.json',
            params,
            null,
            callback
        );
        return this;
    };

};
