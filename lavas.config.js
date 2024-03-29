/**
 * @file lavas config
 * @author Serebii(422574650@qq.com)
 */

'use strict';

const path = require('path');
const BUILD_PATH = path.resolve(__dirname, 'dist');
const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  build: {
    ssr: false,
    path: BUILD_PATH,
    publicPath: '/',
    ssrCopy: isDev ? [] : [{
        src: 'server.prod.js'
      },
      {
        src: 'package.json'
      }
    ]
  },
  router: {
    mode: 'history',
    base: '/',
    pageTransition: {
      type: 'slide',
      slideLeftClass: 'slide-left',
      slideRightClass: 'slide-right',
      alwaysBackPages: ['login'],
      alwaysForwardPages: []
    },
    rewrite: [],
    routes: [
      {
        pattern: /\/login/,
        // lazyLoading: true,
        // chunkname: 'my-chunk',
        meta: {
          requiresAuth: false,
          // keepAlive: true
        }
      }, {
        pattern: /\/register/,
        meta: {
          requiresAuth: false,
        }
      },{
        pattern: /\/bind/,
        meta: {
          requiresAuth: false,
        }
      },{
        path: '/exit',
        redirect: '/login'
      }

    ]
  },
  serviceWorker: {
    // If true, generate service-worker.js and sw-register.js
    // Default to `false`
    enable: true,

    // Path of service worker template
    swSrc: path.join(__dirname, 'core/service-worker.js'),

    // Path of generated service worker file
    swDest: path.join(BUILD_PATH, 'service-worker.js'),

    // If true, `workbox.routing.registerNavigationRoute()` won't be generated
    // Defaults to `false`
    disableGenerateNavigationRoute: false,

    // URL of appshell page
    // ONLY works in SSR mode
    appshellUrl: '/appshell'
  }
};
