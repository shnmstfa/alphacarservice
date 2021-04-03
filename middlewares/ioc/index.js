const WebClient = require('../../core/webClient');
const cache = require('../../core/cache');
const _ = require('lodash');
const { isArrayLikeObject } = require('lodash');

function init(app) {
    app.use((req, res, next) => {
        req.webClientContainer = {};
        req.webClientFactory = function (key) {
            let webClient = req.webClientContainer[key];
            if (!webClient) {
                webClient = new WebClient(key, req);
                req.webClientContainer[key] = webClient;
            }

            return webClient;
        }

        req.cache = cache;

        let sender = res.send
        res.send = function () {
            sender.apply(this, arguments);
        }

        next();
    });
}

module.exports = init;