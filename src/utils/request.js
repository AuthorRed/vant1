import axios from 'axios'
import router from '@/router/index.js'

const service = axios.create({
  // baseURL: 'http://192.168.1.11:8080',
  baseURL: 'http://localhost:8080',
  timeout: 5000,
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    post: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
})


// request interceptor
service.interceptors.request.use(
  config => {
    if (sessionStorage.getItem("token")) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        config.headers['Authorization']= sessionStorage.getItem("token");
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
    return response
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
