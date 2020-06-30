<template>
  <div id="log" class="">
    <header class="mui-bar mui-bar-nav">
      <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
        <span class="mui-icon mui-icon-left-nav"></span>返回
      </button>
      <h1 class="mui-title">登录</h1>
    </header>
    <div class="mui-content">
      <form id='login-form' class="mui-input-group" method="post">
        <div class="mui-input-row">
          <label for="account">账号</label>
          <input name="username" v-model="username" id='account' type="text" class="mui-input-clear mui-input"
                 placeholder="请输入账号">
        </div>
        <div class="mui-input-row">
          <label for="password">密码</label>
          <input name="password" v-model="password" id='password' type="password" class="mui-input-clear mui-input"
                 placeholder="请输入密码">
        </div>
      </form>
      <div class="mui-content-padded">
        <button id='login' type="submit" @click="toLogin" class="mui-btn mui-btn-block mui-btn-primary">登录</button>
        <div class="link-area">
          <router-link id='reg' to="/register">注册账号</router-link>
          <span class="spliter">|</span>
          <router-link id='forgetPassword' to="/forget">忘记密码</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import axios from 'axios';
  import {Toast} from 'mint-ui';
  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      //用户登录
      toLogin() {
        //使用 axios 发送请求
        axios({
          url: 'http://localhost:3000/api/toLogin',
          method: 'get',
          params: {      //请求参数
            username: this.username,
            password: this.password
          }
        }).then(result => {
          // console.log(result.data.result);
          if (result.data.res_code === 0) {   //自定义的响应码为0
            Toast("用户名或密码错误");
          } else if (result.data.res_code === 1) {
            //获取登录的用户信息
            let username = result.data.result[0].username;
            let nickname = result.data.result[0].nickname;
            let qq = result.data.result[0].QQ;
            let phoneNum = result.data.result[0].phone_num;
            let email = result.data.result[0].email;
            let loginU = {
              username,
              nickname,
              qq,
              phoneNum,
              email
            };
            //向 store 中存储登录状态
            this.$store.commit('loginUser', loginU);
            Toast("登录成功");
            this.$router.push('/home');
          }
        });
      }
    }

  }
</script>

<style scoped>
  #log {
    width: 100%;
  }
  .mui-content-padded {
    text-align: center;
  }

  .mui-content-padded .mui-btn-block {
    padding: 5px;
  }

</style>