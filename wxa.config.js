const UglifyjsPlugin = require('@wxa/plugin-uglifyjs');
const ReplacePlugin = require('@wxa/plugin-replace');
const CopyPlugin = require('@wxa/plugin-copy');
let prod = process.env.NODE_ENV === 'production';
const path = require('path');

// 环境变量
const envlist = {
    'WXA_ENV': process.env.NODE_ENV || 'development',
};


module.exports = {
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
    plugins: [
        new ReplacePlugin({
            list: envlist,
        }),
        new CopyPlugin({
            from: 'src/theme',
            to: 'theme',
        }),
    ],
    use: [
        {
            test: /\.js$/,
            name: 'babel',
        },
        {
            test: /\.sass|\.scss/,
            name: 'sass',
        },
    ],
};

if (prod) {
    module.exports.plugins.push(new UglifyjsPlugin());
}
