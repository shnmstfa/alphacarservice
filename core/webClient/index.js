const axios = require('axios');
const http = require('http');
const https = require('https');
const os = require("os");

class WebClient {
    constructor(basePath, req) {
        this.owner = req;
        const httpAgent = new http.Agent({ keepAlive: true });
        this.instance = axios.create({
            httpAgent,
            withCredentials: true,
            shouldKeepAlive: true,
            baseURL: process.env.BACKEND_URL,
            //timeout: 10000,
            headers: {
                "Content-Type": "application/json"
            }
        });

        // this.beforeRequestSend = this.beforeRequestSend.bind(this);
        // this.afterResponseReceived = this.afterResponseReceived.bind(this);
        this.handleError = this.handleError.bind(this);

        this.instance.interceptors.request.use(this.beforeRequestSend);
        this.instance.interceptors.response.use(this.afterResponseReceived, this.handleError);
        this.basePath = basePath;
    }

    beforeRequestSend(config) {
        return config;
    }

    afterResponseReceived(response) {
        return response;
    }

    handleError(err) {
        const error = err.response;
        console.log(error);
        throw err;
    }

    async get(path, config) {
        return await this.instance.get(this.basePath + path, config);
    }

    async post(path, data, config) {
        return await this.instance.post(this.basePath + path, data, config);
    }

    async put(path, data, config) {
        return await this.instance.put(this.basePath + path, data, config);
    }

    async delete(path, config) {
        return await this.instance.delete(this.basePath + path, config);
    }
}

module.exports = WebClient;