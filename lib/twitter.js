"use strict";

var VERSION = '0.2.5';
var http = require('http');
var querystring = require('querystring');
var oauth = require('oauth');
var Keygrip = require('keygrip');
var resources = [
    'direct_messages',
    'favorites',
    'friends_followers',
    'help',
    'lists',
    'oauth',
    'parser',
    'places_geo',
    'saved_searches',
    'search',
    'spam_reporting',
    'streaming',
    'suggested_users',
    'timelines',
    'trends',
    'tweets',
    'users'
];

function merge(defaults, options) {
    defaults = defaults || {};
    if (options && typeof options === 'object') {
        var i = 0,
            keys = Object.keys(options);

        for (i = 0; i < keys.length; i += 1) {
            if (options[keys[i]] !== undefined) {
                defaults[keys[i]] = options[keys[i]];
            }
        }
    }
    return defaults;
}

function Twitter(options) {
    if (!(this instanceof Twitter)) {
        return new Twitter(options);
    }

    var defaults = {
        consumer_key: null,
        consumer_secret: null,
        access_token_key: null,
        access_token_secret: null,

        headers: {
            'Accept': '*/*',
            'Connection': 'close',
            'User-Agent': 'node-twitter/' + VERSION
        },

        request_token_url: 'https://api.twitter.com/oauth/request_token',
        access_token_url: 'https://api.twitter.com/oauth/access_token',
        authenticate_url: 'https://api.twitter.com/oauth/authenticate',
        authorize_url: 'https://api.twitter.com/oauth/authorize',
        callback_url: null,

        rest_base: 'https://api.twitter.com/1.1',
        stream_base: 'https://stream.twitter.com/1.1',
        search_base: 'https://api.twitter.com/1.1/search',
        user_stream_base: 'https://userstream.twitter.com/1.1',
        site_stream_base: 'https://sitestream.twitter.com/1.1',
        filter_stream_base: 'https://stream.twitter.com/1.1/statuses',

        secure: false, // force use of https for login/gatekeeper
        cookie: 'twauth',
        cookie_options: {},
        cookie_secret: null
    };
    this.options = merge(defaults, options);

    if (this.options.cookie_secret === null) {
        this.keygrip = null;
    } else {
        this.keygrip = new Keygrip([this.options.cookie_secret]);
    }

    this.oauth = new oauth.OAuth(
        this.options.request_token_url,
        this.options.access_token_url,
        this.options.consumer_key,
        this.options.consumer_secret,
        '1.0',
        this.options.callback_url,
        'HMAC-SHA1',
        null,
        this.options.headers
    );
}

/*
 * GET
 */
Twitter.prototype.get = function (url, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = null;
    }

    if (typeof callback !== 'function') {
        throw "FAIL: INVALID CALLBACK.";
    }

    if (url.charAt(0) === '/') {
        url = this.options.rest_base + url;
    }

    this.oauth.get(
        url + '?' + querystring.stringify(params),
        this.options.access_token_key,
        this.options.access_token_secret,
        function (error, data) {
            if (error) {
                var err = new Error('HTTP Error '
                    + error.statusCode + ': '
                    + http.STATUS_CODES[error.statusCode]);
                err.statusCode = error.statusCode;
                err.data = error.data;
                callback(err);
            } else {
                try {
                    callback(JSON.parse(data));
                } catch (e) {
                    callback(e);
                }
            }
        }
    );
    return this;
};

/*
 * POST
 */
Twitter.prototype.post = function (url, content, content_type, callback) {
    if (typeof content === 'function') {
        callback = content;
        content = null;
        content_type = null;
    } else if (typeof content_type === 'function') {
        callback = content_type;
        content_type = null;
    }

    if (typeof callback !== 'function') {
        throw "FAIL: INVALID CALLBACK.";
    }

    if (url.charAt(0) === '/') {
        url = this.options.rest_base + url;
    }

    // Workaround: oauth + booleans == broken signatures
    if (content && typeof content === 'object') {
        Object.keys(content).forEach(function (e) {
            if (typeof content[e] === 'boolean') {
                content[e] = content[e].toString();
            }
        });
    }

    this.oauth.post(
        url,
        this.options.access_token_key,
        this.options.access_token_secret,
        content,
        content_type,
        function (error, data) {
            if (error) {
                var err = new Error('HTTP Error '
                    + error.statusCode + ': '
                    + http.STATUS_CODES[error.statusCode]);
                err.statusCode = error.statusCode;
                err.data = error.data;
                callback(err);
            } else {
                try {
                    callback(JSON.parse(data));
                } catch (e) {
                    callback(e);
                }
            }
        }
    );
    return this;
};

Twitter.VERSION = VERSION;

/*
 * GET
 */
Twitter.prototype.get = function (url, params, callback) {
    if (typeof params === 'function') {
        callback = params;
        params = null;
    }

    if (typeof callback !== 'function') {
        throw "FAIL: INVALID CALLBACK.";
    }

    if (url.charAt(0) === '/') {
        url = this.options.rest_base + url;
    }

    this.oauth.get(
        url + '?' + querystring.stringify(params),
        this.options.access_token_key,
        this.options.access_token_secret,
        function (error, data) {
            if (error) {
                var err = new Error('HTTP Error '
                    + error.statusCode + ': '
                    + http.STATUS_CODES[error.statusCode]);
                err.statusCode = error.statusCode;
                err.data = error.data;
                callback(err);
            } else {
                try {
                    callback(JSON.parse(data));
                } catch (e) {
                    callback(e);
                }
            }
        }
    );
    return this;
};

/*
 * POST
 */
Twitter.prototype.post = function (url, content, content_type, callback) {
    if (typeof content === 'function') {
        callback = content;
        content = null;
        content_type = null;
    } else if (typeof content_type === 'function') {
        callback = content_type;
        content_type = null;
    }

    if (typeof callback !== 'function') {
        throw "FAIL: INVALID CALLBACK.";
    }

    if (url.charAt(0) === '/') {
        url = this.options.rest_base + url;
    }

    // Workaround: oauth + booleans == broken signatures
    if (content && typeof content === 'object') {
        Object.keys(content).forEach(function (e) {
            if (typeof content[e] === 'boolean') {
                content[e] = content[e].toString();
            }
        });
    }

    this.oauth.post(
        url,
        this.options.access_token_key,
        this.options.access_token_secret,
        content,
        content_type,
        function (error, data) {
            if (error) {
                var err = new Error('HTTP Error '
                    + error.statusCode + ': '
                    + http.STATUS_CODES[error.statusCode]);
                err.statusCode = error.statusCode;
                err.data = error.data;
                callback(err);
            } else {
                try {
                    callback(JSON.parse(data));
                } catch (e) {
                    callback(e);
                }
            }
        }
    );
    return this;
};

resources.forEach(function (resource) {
    require('./' + resource)(Twitter);
});

module.exports = Twitter;
