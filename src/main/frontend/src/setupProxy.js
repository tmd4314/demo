const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/user/login', // 모든 /user 경로에 대한 요청을 프록시합니다.
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        }),
    )

    app.use(
        '/user/logout', // 모든 /user 경로에 대한 요청을 프록시합니다.
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        }),
    )

    app.use(
		'/weatherApi', 
        createProxyMiddleware({
            target: 'http://apis.data.go.kr/1360000/AsosHourlyInfoService',
            changeOrigin: true,
        }),
    )
    
    app.use(
		'/forestApi',
        createProxyMiddleware( {
            target: 'http://apis.data.go.kr/1400377/forestPoint',
            changeOrigin: true,
        }),
    )
    
    app.use(
		'/statfireApi',
        createProxyMiddleware({
            target: 'http://apis.data.go.kr/1400000/forestStusService',
            changeOrigin: true,
        }),
    )
    
    // mountain
    app.use(
		'/mountainApi',
        createProxyMiddleware( {
            target: 'http://api.forest.go.kr/openapi/service/trailInfoService',
            changeOrigin: true,
        }),
    )
   
};