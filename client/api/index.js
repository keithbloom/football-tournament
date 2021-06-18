const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const apicache = require('apicache');
const morgan = require('morgan');

const PORT = 4000;

const app = express();
const cache = apicache.middleware;
const proxyOptions  = {
    target: 'https://api.football-data.org/v2/',
    changeOrigin: true,
    headers: {
        'X-Auth-Token': '100908f02d9f4e1097a63c5cd0f33119'
    },
    pathRewrite: {
        '^/api/': '/'
    }
}
const apiProxy = createProxyMiddleware(proxyOptions);

app.use('/api', [morgan('dev'),cache('5 minutes'),apiProxy])
app.listen(PORT, () => console.debug(`App listening on ${PORT}`));
