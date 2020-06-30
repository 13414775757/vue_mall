<template>
  <div id="mine">
    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell mui-media" @click="ifLogin">
        <a class="mui-navigate-right">
          <img class="mui-media-object mui-pull-left head-img" id="head-img" src="../../../assets/img/hyrz.jpg">
          <div class="mui-media-body">
            {{ $store.state.user.nickname === undefined ? '未登录': $store.state.user.nickname}}
            <p class='mui-ellipsis'>账号:{{ $store.state.user.username === undefined ? '': $store.state.user.username
              }}</p>
          </div>
        </a>
      </li>
    </ul>
    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell" @click="ifLogin">
        <a class="mui-navigate-right">账号与安全</a>
      </li>
    </ul>
    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell">
        <a href="#notifications" class="mui-navigate-right">新消息通知</a>
      </li>
      <li class="mui-table-view-cell">
        <a href="#privacy" class="mui-navigate-right">隐私</a>
      </li>
      <li class="mui-table-view-cell">
        <a href="#general" class="mui-navigate-right">通用</a>
      </li>
    </ul>
    <ul class="mui-table-view mui-table-view-chevron">
      <li class="mui-table-view-cell">
        <a href="#about" class="mui-navigate-right">关于MUI <i class="mui-pull-right update">V3.1.0</i></a>
      </li>
    </ul>
    <ul class="mui-table-view" style="text-align: center">
      <li class="mui-table-view-cell" style="text-align: center;">
        <!--根据是否登录显示不同的连接-->
        <a v-if="$store.state.user.username" @click="logout">退出登录</a>
        <a v-else @click="goLogin">登录</a>
      </li>
    </ul>
    <!--页面主内容区结束-->
  </div>

</template>

<script>
  // import axios from 'axios';
  import {MessageBox, Toast} from 'mint-ui';
  import 'mint-ui/lib/style.css';

  export default {
    name: "Mine",
    data() {
      return {
        user: ''
      }
    },
    methods: {
      //退出登录功能
      logout() {
        MessageBox.confirm('你确定要退出吗?', '提示').then(action => {
          //向 store 提交方法，实现登录用户的清空
          this.$store.commit('logOut');
          //点击确定退出后跳转
          this.$router.push({path: '/login'});
        }).catch(error => {
          return error;
        });
      },
      //跳转到登录
      goLogin() {
        this.$router.push({path: '/login'});
      },
      ifLogin() {
        if (this.$store.state.user === '') {
          return Toast('未登录');
        } else {
          this.$router.push({path: 'user/account'});
        }


      }
    },
    created() {
    }
  }
</script>

<style scoped>
  #mine {
    padding-top: 44px;

  }
</style>