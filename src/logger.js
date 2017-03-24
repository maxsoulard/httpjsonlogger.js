const fs = require('fs');

const BODY_SUFFIX = '.body.json';
const RAW_SUFFIX = '.raw.json';

module.exports = {

    init: function(_request) {
        return new File(_request);
    }
}

function File(_request) {
    this._request = _request;

    this.prepare = function() {
        var urls = this._request.originalUrl.split(/[\?]/);
        urls = urls[0].split(/[\/]+/);
        this.fileName = './log/' + [Date.now()] + '.' + this._request.method + '.' + urls[urls.length-1];
        
        return this;
    }

    this.log = function(_response) {
        this._logBody(_response.body, '.response' + BODY_SUFFIX);

        var isRequestBodyNotEmpty = this._request.body && Object.keys(this._request.body).length;
        if (isRequestBodyNotEmpty)  this._logBody(this._request.body, '.request' + BODY_SUFFIX);

        this._logRaw(_response);
    },

    this._logBody = function(body, suffix) {
        return fs.writeFile(this.fileName + suffix, JSON.stringify(body, null, "\t"));
    },

    this._logRaw = function(_response) {
        var headers = JSON.stringify(this._request.headers, null, "\t");
        var requestBody = this._request.body ? JSON.stringify(this._request.body) : "";
        var body = _response.body;
        var content = [
                this._request.method,
                "\t",
                this._request.originalUrl,
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
        return fs.writeFile(this.fileName + RAW_SUFFIX, content);
    }
}