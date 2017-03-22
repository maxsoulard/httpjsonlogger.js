const fs = require('fs');
const request = require('request');
const logger = require('./logger');

module.exports = {

    get: function (input, output) {

        var file = logger.init(input).prepare();
        
        request({
            headers: input.headers,
            uri: input.originalUrl,
            method:  input.method,
            params: input.params
        }, function(error, __response, body) {
            output.send(__response.body);
            __response.body = JSON.parse(__response.body);
            file.log(__response);
        });
    },

    post: function (input, output) {

        var file = logger.init(input).prepare();
        
        request({
            headers: input.headers,
            uri: input.originalUrl,
            method:  input.method,
            params: input.params,
            json: input.body
        }, function(error, __response, body) {
            output.send(__response.body);
            file.log(__response);
        });
    },

    put: function (input, output) {

        var file = logger.init(input).prepare();
        
        request({
            headers: input.headers,
            uri: input.originalUrl,
            method:  input.method,
            params: input.params,
            json: input.body
        }, function(error, __response, body) {
            output.send(__response.body);
            file.log(__response);
        });
    },

    delete: function (input, output) {

        var file = logger.init(input).prepare();
        
        request({
            headers: input.headers,
            uri: input.originalUrl,
            method:  input.method,
            params: input.params
        }, function(error, __response, body) {
            output.send(__response.body);
            file.log(__response);
        });
    }
}
