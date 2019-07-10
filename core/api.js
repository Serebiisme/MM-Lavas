import axios from 'axios';
import cookiesHandler from '../js/util';

const api = axios.create({
  timeout:5000,
  responseType: 'json'
})

axios.defaults.baseURL = 'http://192.168.1.101:7001';
axios.defaults.headers.common['Content-Type'] = 'application/json';
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://127.0.0.1:7001'
axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true
axios.defaults.withCredentials = true // 设置凭据模式为true,可以跨域获取cookies

// http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = cookiesHandler.getCookie('token');
    // 若 token 存在, 则在 authorization 中加入token
    if (token) {
      config.headers.authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
);

// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.log('清除token信息并跳转到登录页面');
          // 返回 401 清除token信息并跳转到登录页面
          // router.replace({
          //   path: '/login'
          // });
      }
    }
    return Promise.reject(error.response.data);   // 返回接口返回的错误信息
  }
);

export default api