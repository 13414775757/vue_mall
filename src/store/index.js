import Vue from 'vue';
import Vuex from 'Vuex';
// import {SOME_MUTATION} from "./mutations-type";
//1. 安装插件
Vue.use(Vuex);
//2. 创建store对象
const store = new Vuex.Store({
  state: {   //(data)响应式数据属性
    user: '',
    commentContent: {},
  },
  mutations: {  //更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。(methods属性)
    //获取登录成功提交的方法，和用户信息
    loginUser(state, user) {
      //存储用户信息
      state.user = user;
    },
    //退出时移除登录状态
    logOut(state) {
      state.user = '';
    },
    //新闻详情页面加载时，存储根据id从数据库获取的评论
    getComments(state, comments) {
      state.commentContent = comments;
      // console.log(state.commentContent);
    }
  },
  actions: {   //可以包含异步操作，但是不能实现 state 状态修改

  },
  getters: {    //（computed）计算属性

  },
  modules: {}
});

//3. 导出 store
export default store;


