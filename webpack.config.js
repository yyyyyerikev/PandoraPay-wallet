'use strict';

const environment = (process.env.NODE_ENV || 'development').trim();

if (environment === 'development') {
    module.exports = require('./config/webpack.browser-hot-loader.config');
} else {
    module.exports = require('./config/webpack.browser.config');
}