import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import store from './store'
// import io from 'weapp.socket.io'
// Vue.prototype.socket=io('http://localhost:8888');
// const ws = new WebSocket("ws://localhost:8008");
// Vue.prototype.$ws=ws;
// main.js 将$bus挂载在原型上
Vue.prototype.$bus = new Vue();

import './assets/css/global.css'
import './assets/icon/iconfont.css'

import TreeTable from 'vue-table-with-tree-grid';//树表
import VueQuillEditor from 'vue-quill-editor';//富文本编辑器
// import DragTable from './components/test/drag-table'//拖拽表格
import ArticleList from './components/Article/ArticleList.js'
Vue.use(ArticleList);
import Article from './components/Article/Article.js'
Vue.use(Article);
import Comment from './components/Article/Comment.js'
Vue.use(Comment);
import FootMarkList from './components/FootMark/FootMarkList.js'
Vue.use(FootMarkList);
import Recommend from './components/Recommend.js'
Vue.use(Recommend);
import ChatRoom from './components/Message/ChatRoom.js'
Vue.use(ChatRoom);
import Avatar from './components/My/Avatar.js'
Vue.use(Avatar);

//导入富文本编辑器样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.config.productionTip = false;
axios.defaults.baseURL = 'http://localhost:3838'
// interceptors拦截器，请求拦截
axios.interceptors.request.use(config => {
  //在请求头上挂载token
  config.headers.Authorization = window.sessionStorage.getItem('token') || '';
  // alert(config)
  return config
})
Vue.prototype.$http = axios;
//组件的三种全局挂载方式
Vue.component('tree-table', TreeTable);
Vue.use(VueQuillEditor);
// Vue.prototype.$message=Message
// Vue.component('DragTable',DragTable);


//全局filter过滤器，时间格式转换
Vue.filter('dateFormat', function toTime(time) {
  let nowTime = Date.now();
  let t = Math.ceil((nowTime - time) / 1000);
  // console.log(t);
  let ts = "";
  if (t < 60) ts = `${t}秒前`;
  else if (t >= 60 && t < 3600) {
    ts = `${Math.ceil(t / 60)}分钟前`;
  } else if (t >= 3600 && t < 3600 * 24) {
    ts = `${Math.ceil(t / 3600)}小时前`;
  } else if (t >= 3600 * 24 && t < 3600 * 48) {
    ts = `昨天`;
  } else {
    ts = new Date(time - 0).toLocaleString('zh', { hour12: false });
  }
  return ts;
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
