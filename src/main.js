import Vue from 'vue';
import App from './App.vue';
import qs from 'qs';

Vue.prototype.$qs = qs;
//导入 router.js 路由模块
import router from "./router/index.js";
import axios from 'axios';

Vue.prototype.$http = axios;
//导入 store 状态仓库对象
import store from "./store/index.js";

Vue.config.productionTip = false;
//按需导入 mint-ui 组件
import {Header, Toast, Tabbar, Swipe, SwipeItem, MessageBox, Button, Badge, Navbar, TabItem} from 'mint-ui';
import {TabContainer, TabContainerItem, Field, Picker} from 'mint-ui';

Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
//导入 mint-ui样式
import 'mint-ui/lib/style.css';
//导入 mui 样式
import './assets/css/mui/css/mui.min.css';
//导入 extra 扩展图标的 mui 包 并且在fonts文件中添加一个extra.ttf文件, icons-extra.css依赖于mui-icons-extra.ttf文件
import './assets/css/mui/css/icons-extra.css';
// import './assets/css/mui/js/mui.min.js';
import mui from './assets/css/mui/js/mui.js';

Vue.prototype.mui = mui;

//导入格式化时间的插件
import moment from 'moment';
//定义全局过滤器（格式化时间）
Vue.filter('dataFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});
//价格过滤器格式化价格
Vue.filter('priceFormat', function (price, pattern = 2) {
  //转为浮点型，不转会报错，不知道为什么。
  return parseFloat(price).toFixed(pattern);
});

//注册对应 mint-ui 组件
Vue.component(Header.name, Header);
Vue.component(Tabbar.name, Tabbar);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Button.name, Button);
Vue.component(Badge.name, Badge);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(Toast.name, Toast);
Vue.component(Field.name, Field);
Vue.component(Picker.name, Picker);


new Vue({
  render: h => h(App),
  router,
  store,  //注册store对象
}).$mount('#app');
