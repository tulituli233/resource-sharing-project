import Vue from 'vue'//plugins插件
import { Button,MessageBox,Tag,Select,Option,Cascader,Alert,Tabs,TabPane,Steps,Step,Upload,Timeline,TimelineItem,Popconfirm } from 'element-ui'
import {Form,FormItem,Row,Col,Table,TableColumn,Switch,Tooltip,Pagination,Dialog,Tree,CheckboxGroup,Checkbox} from 'element-ui'
import {Input,Message,Container,Header,Aside,Main,Menu,Submenu,MenuItem,Breadcrumb,BreadcrumbItem,Card,Progress} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Steps)
Vue.use(Step)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Upload)
Vue.use(Timeline)
Vue.use(TimelineItem)
Vue.use(Progress)
Vue.use(Popconfirm)


Vue.prototype.$message=Message//prototype原型
Vue.prototype.$confirm=MessageBox
