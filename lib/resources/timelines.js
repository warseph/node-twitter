"use strict";

module.exports = function (Twitter) {

    Twitter.prototype.getMentionsTimeline = function (params, callback) {
        this.get(
            '/statuses/mentions_timeline.json',
            params,
            callback
        );
    };

    Twitter.prototype.getUserTimeline = function (params, callback) {
        this.get(
            '/statuses/user_timeline.json',
            params,
            callback
        );
    };

    Twitter.prototype.getHomeTimeline = function (params, callback) {
        this.get(
            '/statuses/home_timeline.json',
            params,
            callback
        );
    };

    Twitter.prototype.getRetweetsOfMe = function (params, callback) {
        this.get(
            '/statuses/retweets_of_me.json',
            params,
            callback
        );
    };

};
