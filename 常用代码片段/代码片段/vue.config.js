module.exports = {
    publicPath: '/',  // 打包环境
    outputDir: process.env.outputDir,
    assetsDir: 'static',
    productionSourceMap: false,
    lintOnSave: false,
    devServer: {
        open: true,
        host: '0.0.0.0', // 允许外部ip访问
        port: 86, // 端口
        https: false, // 启用https
        overlay: {
            warnings: true,
            errors: true
        }, // 错误、警告在页面弹出
        proxy: {
            '/Api': {
                target: process.env.VUE_APP_baseUrl,
                // target: 'http://192.168.50.109:9011',//测试环境
                //  target:'http://192.168.50.100:9011',//联调
                //  target:'http://172.26.9.21:9011',//开发环境
                changeOrigin: true,
                pathRewrite: {
                     '^/Api': ''
                }
            }
        } // 代理转发配置，用于调试环境
    },
}