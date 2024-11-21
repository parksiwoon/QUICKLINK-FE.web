const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://13.125.147.93", // 실제 API 서버 주소,
      changeOrigin: true,
    })
  );
};
