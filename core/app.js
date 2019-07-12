/**
 * @file entry
 * @author Serebii(422574650@qq.com)
 */
import Vue from 'vue';
import Meta from 'vue-meta';
import Vant from 'vant';
import moment from 'moment';
Vue.prototype.$moment = moment;

import 'vant/lib/index.css';
import cookiesHandler from '../js/util';
import api from './api';

import {createRouter} from '@/.lavas/router';
import {createStore} from '@/.lavas/store';
import AppComponent from './App.vue';

// 个人组件引入
import WhiteSpace from '@/components/Whitespace.vue'
import WingBlank from '@/components/WingBlank.vue'
Vue.component('van-whitespace',WhiteSpace);
Vue.component('van-wingblank',WingBlank);

Vue.use(Meta);
Vue.use(Vant);

Vue.prototype.$post = api.post
Vue.prototype.$get = api.get
Vue.prototype.$delete = api.delete
Vue.prototype.$patch = api.patch
Vue.prototype.$put = api.put
Vue.prototype.$axios = api

Vue.config.productionTip = false;

export function createApp() {
    let router = createRouter();

    // 路由守卫设置
    router.beforeEach((to, from, next) => {
      console.log('路由拦截',to, from);
      const token = cookiesHandler.getCookie('token');
      const requiresAuth = to.meta.requiresAuth === void 0 ? true : to.meta.requiresAuth;
      if (!token && requiresAuth) {
        console.log('没有token');
        return next({
          replace: true, // 避免左右手势滑动
          name: 'login'
        });
      }
      console.log('token存在 或 当前页为Login页');
      next();
    })

    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return {App, router, store};
}

if (module.hot) {
    module.hot.accept();
}
