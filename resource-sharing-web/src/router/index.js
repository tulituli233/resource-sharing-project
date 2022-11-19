import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginView from '../views/LoginView.vue'
import Home from '../components/Home.vue'
import IndexView from '../views/IndexView.vue'
import FollowView from '../views/FollowView.vue'
import CateView from '../views/CateView.vue'
import MessageView from '../views/MessageView.vue'
import MyView from '../views/MyView.vue'
import ArticleView from '../views/ArticleView.vue'

// my
import AddArticle from '../components/My/AddArticle.vue'

Vue.use(VueRouter)

//routes路线
const routes = [
  { path: '/', redirect: '/login' },//redirect人，路由重定向
  { path: '/login', component: LoginView, name: '登录', fullpath: '', meta: { title: '欢迎' }, },//component部件
  {
    path: '/home', component: Home, redirect: '/index', meta: { title: '欢迎' },
    children: [//子路由
      { path: '/index', component: IndexView, name: '首页', fullPath: '/home/index', meta: { title: '首页' }, },
      { path: '/follow', component: FollowView, name: '关注', fullPath: '/home/follow', meta: { title: '关注' }, },
      { path: '/cate', component: CateView, name: '分类', fullPath: '/home/cate', meta: { title: '分类' }, },
      { path: '/message', component: MessageView, name: '消息', fullPath: '/home/message', meta: { title: '消息' }, },
      {
        path: '/my', component: MyView, name: '我的', fullPath: '/home/my', meta: { title: '我的' }, children: [//子路由
          { path: '/addArticle', component: AddArticle, name: '我要分享', fullPath: '/home/index/addArticle', meta: { title: '我要分享' }, },
        ]
      },
      { path: '/article', component: ArticleView, name: '文章详情', fullPath: '/home/article', meta: { title: '文章详情' }, },
    ]
  }
]
//路由器
const router = new VueRouter({
  routes
})
//每次路由选择之前必须做的事
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();//去登录直接放行
  const token = window.sessionStorage.getItem('token');
  if (!token) return next('/login');//没有token强制登录****
  next();
})

export default router
