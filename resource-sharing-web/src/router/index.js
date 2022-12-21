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
import MyCollection from '../components/My/MyCollection.vue'
import MyHistory from '../components/My/MyHistory.vue'
import MyInfo from '../components/My/MyInfo.vue'
import MyOrder from '../components/My/MyOrder.vue'
import MyShare from '../components/My/MyShare.vue'
import MyAvatar from '../components/My/MyAvatar.vue'

//message
import myChats from '../components/Message/MyChats.vue'
import myComments from '../components/Message/MyComments.vue'
import myLikes from '../components/Message/MyLikes.vue'
import MySell from '../components/Message/MySell.vue'
import sysNotice from '../components/Message/SysNotice.vue'

import ChatRoom from '../components/Message/ChatRoom.vue'
import MainPage from '../components/Message/MainPage.vue'

Vue.use(VueRouter)

//routes路线
const routes = [
  { path: '/', redirect: '/login' },//redirect人，路由重定向
  { path: '/login', component: LoginView, name: '登录', fullpath: '', meta: { title: '欢迎' }, },//component部件
  {
    path: '/home', component: Home, redirect: '/index', meta: { title: '欢迎' },
    children: [//子路由
      { path: '/index', component: IndexView, name: '首页', fullPath: '/home/index', meta: { title: '首页' }, },
      { path: '/follow', component: FollowView, name: '动态', fullPath: '/home/follow', meta: { title: '动态' }, },
      { path: '/cate', component: CateView, name: '分类', fullPath: '/home/cate', meta: { title: '分类' }, },
      {
        path: '/message', component: MessageView, name: '消息', fullPath: '/home/message', redirect: '/myChats', meta: { title: '消息' }, children: [//子路由
          { path: '/myChats', component: myChats, name: '私信列表', fullPath: '/home/message/myChats', meta: { title: '私信列表' }, },
          { path: '/myComments', component: myComments, name: '回复', fullPath: '/home/message/myComments', meta: { title: '回复' }, },
          { path: '/myLikes', component: myLikes, name: '收到的赞', fullPath: '/home/message/myLikes', meta: { title: '收到的赞' }, },
          { path: '/mySell', component: MySell, name: '兑换消息', fullPath: '/home/message/mySell', meta: { title: '兑换消息' }, },
          { path: '/sysNotice', component: sysNotice, name: '系统消息', fullPath: '/home/message/sysNotice', meta: { title: '系统消息' }, },
        ]
      },
      {
        path: '/my', component: MyView, name: '我的', fullPath: '/home/my', meta: { title: '我的' }, redirect: '/myHistory', children: [//子路由
          { path: '/addArticle', component: AddArticle, name: '我要分享', fullPath: '/home/index/addArticle', meta: { title: '我要分享' }, },
          { path: '/myCollection', component: MyCollection, name: '我的收藏', fullPath: '/home/index/myCollection', meta: { title: '我的收藏' }, },
          { path: '/myHistory', component: MyHistory, name: '历史记录', fullPath: '/home/index/myHistory', meta: { title: '历史记录' }, },
          { path: '/myInfo', component: MyInfo, name: '我的资料', fullPath: '/home/index/myInfo', meta: { title: '我的资料' }, },
          { path: '/myOrder', component: MyOrder, name: '我的购买', fullPath: '/home/index/myOrder', meta: { title: '我的购买' }, },
          { path: '/myShare', component: MyShare, name: '我的分享', fullPath: '/home/index/myShare', meta: { title: '我的分享' }, },
          { path: '/MyAvatar', component: MyAvatar, name: '设置头像', fullPath: '/home/index/MyAvatar', meta: { title: '设置头像' }, },
        ]
      },
      { path: '/article', component: ArticleView, name: '文章详情', fullPath: '/home/article', meta: { title: '文章详情' }, },
      { path: '/chat', component: ChatRoom, name: '私信', fullPath: '/home/chat', meta: { title: '私信' }, },
      { path: '/mainpage', component: MainPage, name: '主页', fullPath: '/home/mainpage', meta: { title: '主页' }, },
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
