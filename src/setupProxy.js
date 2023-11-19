const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/sunbase/portal/api',
    createProxyMiddleware({
      target: 'https://qa2.sunbasedata.com',
      changeOrigin: true,
    })
  );
};
