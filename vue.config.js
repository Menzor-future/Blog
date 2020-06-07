const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    // assetsDir :"",
    // publicPath: './',
    chainWebpack: (config) => {
        config.resolve.alias
            //set第一个参数：设置的别名，第二个参数：设置的路径
            .set('@', resolve('./src'))
            .set('components', resolve('./src/components'))
            .set('assets', resolve('./src/assets'))
            .set('views', resolve('./src/views'))
            .set('network', resolve('./src/network'))
        //注意 store 和 router 没必要配置
    },
    devServer: {
        // 解决跨域问题
        open: true,
        proxy: {
            '/api': {
                // target: 'http://120.79.187.154:3000/api',

                target: 'http://localhost:3000/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    //配置排除打包哪些插件
    configureWebpack:{
        externals:{
            'vue' : 'Vue',
            'vue-router' :'VueRouter',
            'vuex':'Vuex',
            'axios':'axios',
            'moment':'moment'
        }
    },
    //配置可视化vendor.js分析插件
    // chainWebpack: config => {
    //     config
    //         .plugin('webpack-bundle-analyzer')
    //         .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // }
}