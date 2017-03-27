const fs = require('fs');

const BODY_SUFFIX = '.body.json';
const RAW_SUFFIX = '.raw.json';

module.exports = {
    log: function(_request, _response) {
        var fileName = this._getFileName(_request);

        this._logBody(_response.body, fileName + '.response' + BODY_SUFFIX);

        var isRequestBodyNotEmpty = _request.body && Object.keys(_request.body).length;
        if (isRequestBodyNotEmpty)  this._logBody(_request.body, fileName + '.request' + BODY_SUFFIX);

        this._logRaw(_request, _response, fileName + RAW_SUFFIX);
    },

    _getFileName: function(_request) {
        var fileName = '';
        var url = _request.originalUrl.split(/[\?]/);
        url = url[0].match(/http:\/\/\w+:?\d*(.*)/)[1].replace(/[\/]/g, ".");
        
        return './log/' + [Date.now()] + '.' + _request.method + url;;
    },

    _logBody: function(body, fileName) {
        return fs.writeFile(fileName, JSON.stringify(body, null, "\t"));
    },

    _logRaw: function(_request, _response, fileName) {
        var headers = JSON.stringify(_request.headers, null, "\t");
        var requestBody = _request.body ? JSON.stringify(_request.body) : "";
        var body = _response.body;
        var content = [
                _request.method,
                "\t",
                _request.originalUrl,
                "\nREQUEST HEADERS\n",
                headers,
                "\nREQUEST BODY\n",
                requestBody,
                "\n\n\n",
                "RESPONSE\n",
                "HTTP STATUS CODE ",
                _response.statusCode,
                "\n\nBODY\n",
                JSON.stringify(body, null)
            ].join("");
        return fs.writeFile(fileName, content);
    }
}