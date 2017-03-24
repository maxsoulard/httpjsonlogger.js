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
    get:    handle,
    post:   handle,
    put:    handle,
    delete: handle
}

function handle(creq, cres) {
    var httpLogger = logger.init(creq).prepare();
    var data='';
    
    request({
        method: creq.method,
        preambleCRLF: true,
        postambleCRLF: true,
        uri: creq.originalUrl,
        headers: creq.headers,
        'content-type': 'application/json',
        params: creq.params,
        json: creq.body
    })
    .on('data', function(chunk) {
        data += chunk;
    })
    .on('end', function() {
        try {
            cres.body = JSON.parse(data);
            httpLogger.log(cres);
        } catch (e) {
            winston.log('error', e);
            return;
        }
    })
    .pipe(cres);
}