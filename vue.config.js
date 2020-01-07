module.exports = {
    //打包空白
    publicPath: process.env.NODE_ENV === "production" ? "/bigScreen/" : "/",
    lintOnSave: true,
    devServer: {
		//host:'localhost',
		//port:8080,
        proxy: {
            '/api': {
                target: 'http://172.16.99.53:8080/',
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