import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import store from './store'

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

//导入富文本编辑器样式
import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.config.productionTip = false;
axios.defaults.baseURL='http://localhost:3838'
// interceptors拦截器，请求拦截
axios.interceptors.request.use(config=>{
  //在请求头上挂载token
  config.headers.Authorization=window.sessionStorage.getItem('token')||'';
  // alert(config)
  return config
})
Vue.prototype.$http=axios;
//组件的三种全局挂载方式
Vue.component('tree-table',TreeTable);
Vue.use(VueQuillEditor);
// Vue.prototype.$message=Message
// Vue.component('DragTable',DragTable);


//全局filter过滤器，时间格式转换
Vue.filter('dateFormat',function(originVal){
  const dt= new Date(originVal*1000);
  // const dt= new Date(originVal);
  const y=dt.getFullYear();
  const m=(dt.getMonth()+1+'').padStart(2,'0');//padStart开头填充
  const d=(dt.getDate()+'').padStart(2,'0');

  const hh=(dt.getHours()+'').padStart(2,'0');
  const mm=(dt.getMinutes()+'').padStart(2,'0');
  const ss=(dt.getSeconds()+'').padStart(2,'0');

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
