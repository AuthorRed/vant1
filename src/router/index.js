import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children :[
      {
        path: '/searchList',
        name: 'SearchList',
        component: () => import('../views/SearchList.vue')
      },

    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import( '../views/About.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import( '../views/Shop.vue')
  },
  {
    path: '/messageList',
    name: 'MessageList',
    component: () => import( '../views/MessageList.vue'),
    /* children:  [
      {
        path: 'messageItem',
        name: 'MessageItem',
        component: () => import('../views/MessageItem.vue')
      },
    ] */
  },
  {
    path: '/me',
    name: 'Me',
    component: () => import('../views/Me.vue'),
    children:  [
      {
        path: 'cellContent',
        name: 'CellContent',
        component: () => import('../views/CellContent.vue')
      },
      {
        path: 'loginForm',
        name: 'LoginForm',
        component: () => import('../views/LoginForm.vue')
      },
      {
        path: 'commodityList',
        name: 'CommodityList',
        component: () => import('../views/CommodityList.vue')
        ,
        children:  [
          {
            path: 'commodityAdd',
            name: 'CommodityAdd',
            component: () => import('../views/CommodityAdd.vue')
          },
          {
            path: 'commodityDisplay/:id',
            name: 'CommodityDisplay',
            component: () => import('../views/CommodityDisplay.vue'),
            children:  [
              {
                path: 'messageItem',
                name: 'MessageItem',
                component: () => import('../views/MessageItem.vue')
              }
            ]
          }
        ]
      },
      {
        path: 'registerForm',
        name: 'RegisterForm',
        component: () => import('../views/RegisterForm.vue')
      },
      {
        path: 'goodsList',
        name: 'GoodsList',
        component: () => import('../views/GoodsList.vue')
      },
        
      ]
    
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
