const { promisify } = require("util");
const redis = require("redis");
const client = redis.createClient({ host: process.env.REDIS_DOMAIN, port: process.env.REDIS_PORT });

const expireAsync = promisify(client.expire).bind(client);
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const delAsync = promisify(client.del).bind(client);

module.exports = {
    getAsync,
    setAsync,
    delAsync,
    expireAsync
}