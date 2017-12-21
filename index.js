var request = require('request');
var querystring = require('querystring');

/**
 * Madinova API Client for NodeJS
 * @constructor
 * @param {string}  userKey
 * @param {string}  userSecret
 * @param {string}  zoneId
 * @author Melih Taşdizen <melih.tasdizen@segmentify.com>
 */
function Medianova(userKey, userSecret, zoneId) {
    this.apiUrl = 'https://api.medianova.com/v1';
    this.userKey = userKey;
    this.userSecret = userSecret;
    this.zoneId = zoneId;

    return this;
}

Medianova.prototype.purge_info = function (limit, page, search) {
    var resource = '/zone/purge/info';

    qs_params = this._authInfo();
    qs_params['limit'] = limit || 1000;
    qs_params['page'] = page || 1;
    qs_params['search'] = search || '';

    request({
        method: 'get',
        url: this.apiUrl + resource,
        strictSLL: true,
        json: true,
        qs: qs_params
    }, function (error, response, data) {
        if (!error && !!data.status && data.status !== true) {
            error = new Error(data.error.message || data.opid);
        }
        callback(error, data || {});
    });
};

Medianova.prototype.purge_add = function (file_list, callback) {
    var resource = '/zone/purge/add';

    var body = {};

    body = this._authInfo();
    body['files'] = file_list;

    request({
        method: 'post',
        url: this.apiUrl + resource,
        strictSLL: true,
        json: true,
        body: body
    }, function (error, response, data) {
        if (!error && !!data.status && data.status !== true) {
            error = new Error(data.error.message || data.opid);
        }
        callback(error, data || {});
    });

};

Medianova.prototype._authInfo = function() {
  return {
      'userKey': this.userKey,
      'userSecret': this.userSecret,
      'zoneId': this.zoneId
  }

};

module.exports = Medianova;