const fs = require('fs');
const request = require('request');
const logger = require('./logger');
const winston = require('winston');

winston.configure({
    transports: [
      new (winston.transports.File)({ filename: 'httpmonitor.js.log' })
    ]
  });

module.exports = {

    get: function (input, output) {

        var httpLogger = logger.init(input).prepare();
        
        request({
            headers: input.headers,
            uri: input.originalUrl,
            method:  input.method,
            params: input.params
        }, function(error, __response, body) {
            output.send(__response.body);
            try {
                __response.body = JSON.parse(__response.body);
                httpLogger.log(__response);
            } catch (e) {
                winston.log('error', e);
                return;
            }
        });
    },

    post: function (input, output) {

        var httpLogger = logger.init(input).prepare();
        
        request({
            headers: input.headers,
            uri: input.originalUrl,
            method:  input.method,
            params: input.params,
            json: input.body
        }, function(error, __response, body) {
            output.send(__response.body);
            try {
                httpLogger.log(__response);
            } catch (e) {
                winston.log('error', e);
                return;
            }
        });
    },

    put: function (input, output) {

        var httpLogger = logger.init(input).prepare();
        
        request({
            headers: input.headers,
            uri: input.originalUrl,
            method:  input.method,
            params: input.params,
            json: input.body
        }, function(error, __response, body) {
            output.send(__response.body);
            try {
                httpLogger.log(__response);
            } catch (e) {
                winston.log('error', e);
                return;
            }
        });
    },

    delete: function (input, output) {

        var httpLogger = logger.init(input).prepare();
        
        request({
            headers: input.headers,
            uri: input.originalUrl,
            method:  input.method,
            params: input.params
        }, function(error, __response, body) {
            output.send(__response.body);
            try {
                httpLogger.log(__response);
            } catch (e) {
                winston.log('error', e);
                return;
            }
        });
    }
}
