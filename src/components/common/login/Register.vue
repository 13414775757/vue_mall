<template>
  <div class="register">
    <div class="mui-bar mui-bar-nav">
      <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
        <span class="mui-icon mui-icon-left-nav"></span>返回
      </button>
      <h1 class="mui-title">注册</h1>
    </div>
    <div class="infoInput">
      <mt-field label="用户名" v-model="userInfo.username" type="text" placeholder="请输入用户名"></mt-field>
      <mt-field label="密码" v-model="userInfo.password" type="text" placeholder="请输入密码"></mt-field>
      <mt-field label="昵称" v-model="userInfo.nickname" type="text" placeholder="请输入昵称"></mt-field>
      <mt-field label="QQ号" v-model="userInfo.qq" type="text" placeholder="请输入QQ号"></mt-field>
      <mt-field label="手机号" v-model="userInfo.phoneNum" type="text" placeholder="请输入手机号"></mt-field>
      <mt-field label="邮箱" v-model="userInfo.email" type="text" placeholder="请输入邮箱"></mt-field>
    </div>
    <mt-button size="large" class="mui-btn mui-badge-blue" @click="toRegister">注册</mt-button>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  export default {
    name: "Register",
    data() {
      return {
        userInfo: {
          username: '',
          password: '',
          nickname: '',
          qq: '',
          phoneNum: '',
          email: ''
        }
      }
    },
    methods: {
      toRegister() {
        let user = this.userInfo;
        this.$http.post('http://localhost:3000/api/register', {
          user
        }).then(result => {
          if (result.status === 200) {
            Toast('注册成功');
            this.$router.push('/login');
          }
        }).catch(error => {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped>
  .register {
    padding-top: 44px;
  }
  .infoInput {
    margin-top: 5px;
  }
  input[type=text] {
    margin-bottom: 0px;
  }
</style>