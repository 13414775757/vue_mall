import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
//路由懒加载
const HomeContainer = () => import('../views/home/HomeContainer.vue');
const ClassifyContainer = () => import('../views/home/ClassifyContainer.vue');
const UserContainer = () => import('../views/home/UserContainer.vue');
const ShopCarContainer = () => import('../views/home/ShopCarContainer.vue');
const Login = () => import('../components/common/login/Login.vue');
const NewsList = () => import('../components/content/news/NewsList.vue');
const NewsInfo = () => import('../components/content/news/NewsInfo.vue');
const Account = () => import('../components/content/mine/Account.vue');
const GoodsByClass = () => import('../components/content/classify/GoodsByClass.vue');

const routes = [
  {path: '/', redirect: '/home'},
  {path: '/home', component: HomeContainer},
  {path: '/classify', component: ClassifyContainer},
  {path: '/classify/goodsByClass/:id', component: GoodsByClass},
  {path: '/shop_car', component: ShopCarContainer},
  {path: '/user', component: UserContainer},
  {path: '/user/account', component: Account},
  {path: '/login', component: Login},
  {path: '/register', component: () => import('../components/common/login/Register.vue')},
  {path: '/forget', component: () => import('../components/common/login/Forget.vue')},
  {path: '/home/newsList', component: NewsList},
  {path: '/home/writeNews', component: () => import('../components/content/news/WriteNews.vue')},
  {path: '/home/newsInfo/:id', component: NewsInfo},
  {path: '/home/photosList', component: () => import('../components/content/picture/PhotosList.vue')},
  {path: '/home/goodsMall', component: () => import('../components/content/mall/GoodsMall.vue')},
  {path: '/home/goodsMall/goodsInfo/:id', component: () => import('../components/content/mall/GoodsInfo.vue')}

];

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'mui-active',    //mui-active 显示路由高亮，
  // 每次点击<router-link>相应路由时，增加一个 mui-active属性 显示选中的高亮效果
  // 覆盖默认的路由选中高亮的类，默认的类叫 router-link-active
});

export default router;