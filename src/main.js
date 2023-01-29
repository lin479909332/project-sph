import Vue from 'vue'
import App from './App.vue'
//引入路由
import router from '@/router'
import store from '@/store'
//三级联动------全局组件
import TypeNav from '@/components/TypeNav'
//封装好的轮播组件
import Carousel from '@/components/Carousel';
//分页器组件
import Pagination from '@/components/Pagination';
//饿了么UI组件
import { Button, MessageBox } from 'element-ui';
//懒加载
import VueLazyLoad from 'vue-lazyload';
//引入加载图片
import loading from '@/assets/images/loading2.gif'
//引入表单校验插件
import "@/plugins/validate";

//全局注册组件 第一个参数 组件名，第二个参数 组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button);

//饿了么组件引入方法2，挂载在Vue的原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//懒加载配置
Vue.use(VueLazyLoad,{
  loading:loading
})



import { reqCategoryList } from '@/api';
reqCategoryList();

//mockServer.js mock数据用的
import '@/mock/mockServer.js';
//swiper的样式
import 'swiper/css/swiper.css';
//统一引入所有请求api
import * as API from "@/api"


new Vue({
  render: h => h(App),
  // 全局事件总线$bus的配置
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store
}).$mount('#app')
