import axios from "axios";

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5/',
    timeout:10000
  })

  //2.请求拦截
  // instance.interceptors.request.use(config => {
  //   //1.比如config中一些信息不符合服务器的要求
  //   //2.比如每次发送网络请求时，都希望在页面显示一个请求的图标
  //   //3.某些网络请求（比如登入(token)）,必须携带一些特殊的信息
  //
  //   console.log(config);
  //   return config
  // },err => {
  //   console.log(err);
  // })

  //响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  },err => {
    console.log(err);
  })

  //3.发送真正的网络请求
  return instance(config)
}

