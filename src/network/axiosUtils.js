import axios from 'axios';

//最终方式
export function request(config) {
  const instance = axios.create({
    baseURL: 'localhost:3000/api',
    timeout: 3000
  });
  // axios 拦截器
  //request，请求拦截
  // instance.interceptors.request.use(
  //     //请求成功
  //     config => {
  //         Promise.resolve(config)
  //     },
  //     //请求失败
  //     error => {
  //         // 请求错误处理
  //         Promise.reject(error);
  //     }
  // );
  // //response响应拦截
  // instance.interceptors.response.use(
  //     //响应结果
  //     result => {
  //         // console.log(result);
  //     },
  //     //响应失败
  //     error => {
  //         console.log(error);
  //     }
  // );
  return instance(config);  //instance(config)的返回值就是一个Promise对象
}

