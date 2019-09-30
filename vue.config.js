module.exports = {
    //打包空白
    publicPath: './',
    lintOnSave: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://www.topeasypark.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    //px转rem
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 32,
                        propList: ['*'],
                        selectorBlackList: ['wisdom-', 'el-']
                    })
                ]
            }
        }
    }

}