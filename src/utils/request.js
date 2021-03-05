import axios from 'axios'
import router from '@/router/index.js'
import store from '@/store/store.js'
import LocalStorage from "./localStorage.js";

const service = axios.create({
  // baseURL: 'http://192.168.1.11:8080',
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    post: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
})
// 是否正在请求刷新token接口的标记
let isRefreshing = false;
// 请求队列
let requests = [];
let SECURITY_URL = "/user/refreshTokenLogin?refreshToken=";//刷新token接口的base路径
//刷新token方法
function refreshToken(params) {
  return service.get(SECURITY_URL +  params);
}

// request interceptor
service.interceptors.request.use(
  config => {
    /* if (sessionStorage.getItem("token")) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        config.headers['Authorization']= sessionStorage.getItem("token");
    } */
    if (store.state.user) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
      config.headers['token']= store.state.user.token;
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    console.log(response);
    const config = response.config;
    let msg = response.data.msg;
    //这里的code值是跟后端约定好的， 40009代表token已经过期
    if (msg.indexOf("TOKEN_USER_ERROR")>=0) {
      console.log('开始刷新token');
      if (!isRefreshing) {
        isRefreshing = true;
        let refresh_token = LocalStorage.get("refreshToken");
        refreshToken(refresh_token)
          .then((res) => {
            console.log(res);
            let user = res.data.extenal.user;
            if(user){
              store.commit('setUser',user);
              LocalStorage.set("refreshToken", user.refreshToken);
              config.headers["token"] = store.state.user.token;
              config.headers["refreshToken"] = LocalStorage.get(refreshToken);
              config.baseURL = ''; 
              return service(config);
            }
          })
          .catch((err) => {
            console.log('刷新token异常');
            console.log(err);
            //window.location.href = "/";
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        // 正在刷新token，返回一个未执行resolve的promise
        return new Promise((resolve) => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push((access_token, refresh_token) => {
            config.headers["access_token"] = access_token;
            config.headers["refresh_token"] = refresh_token;
            resolve(service(config));
          });
        });
      }
    } else {
      return response;
    }
  },
  error => {
    done = start = 0
    NProgress.done();
    if (error.response && +error.response.status === 401) {
      // alert(1)
      // window.location.href = error.response.headers.location
      router.replace({
                      path: '/login',
                      query: {redirect: router.currentRoute.fullPath}
                    })
    }
    return Promise.reject(error)
  }
)
export default service
