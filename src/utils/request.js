//axios二次封装
import axios from 'axios';
//引入进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

// 创建axios实例
const service = axios.create({
  //基础路径
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时时间
  timeout: 5000
})

//请求拦截器
service.interceptors.request.use(
  //config 配置对象
  config => {
    //在发送请求前进行一些操作
    // 设置请求头等操作
    
    //进度条
    nprogress.start();
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error)
  }
)

//响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    //do something

    //进度条
    nprogress.done();
    return res;
  },

  //失败
  error => {
    console.log('error',error)
    return Promise.reject(error)
  }
)
export default service;
