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
        url = url[0].match(/http:\/\/(.*)/)[1].replace(/[:]/g, ".").replace(/[\/]/g, ".");
        
        return [Date.now()] + '.' + _request.method + "_" + url;
    },

    _logBody: function(body, fileName) {
        return this._writeFile(fileName, JSON.stringify(body, null, "\t"));
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
        
        return this._writeFile(fileName, content);
    },

    _writeFile: function(fileName, content) {
        try {
            fs.mkdirSync(conf.dir);
        } catch (e) {
            if (e.code !== "EEXIST")    throw e;
            else                        return;
        } finally {
            return fs.writeFile(conf.dir + fileName, content);
        }        
    }
}