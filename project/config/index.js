'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},
        // proxyTable: {
        //     '/tank': {
        //         target: 'http://localhost:3000', //目标服务器,注意要到端口号
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/tank': '/' //重写api使得 /api/login -> http://localhost:1337/login等等，这里好多csdn博主跟我的不一样，可能个人喜好问题，只要映射到相应的url就行了
        //         }
        //     }
        // },
        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
        devtool: 'cheap-module-eval-source-map',
        cacheBusting: true,
        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
         * Source Maps
         */

        productionSourceMap: true,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    }
}