<template>
  <div id="account" class="mui-page">
    <div class="mui-navbar-inner mui-bar mui-bar-nav">
      <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
        <span class="mui-icon mui-icon-left-nav"></span>返回
      </button>
      <h1 class="mui-center mui-title">账号与安全</h1>
    </div>
    <div class="mui-page-content">
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a>昵称<span
                  class="mui-pull-right">{{$store.state.user.nickname === undefined ? '':$store.state.user.nickname}}</span></a>
        </li>
        <li class="mui-table-view-cell">
          <a>VueMall账号<span class="mui-pull-right">{{$store.state.user.username === undefined ? '':$store.state.user.username}}</span></a>
        </li>
      </ul>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <a>QQ号<span class="mui-pull-right">{{$store.state.user.qq === undefined ?'':$store.state.user.qq}}</span></a>
        </li>
        <li class="mui-table-view-cell">
          <a>手机号<span class="mui-pull-right">{{$store.state.user.phoneNum === undefined ? '':$store.state.user.phoneNum}}</span></a>
        </li>
        <li class="mui-table-view-cell">
          <a>邮箱地址<span
                  class="mui-pull-right">{{$store.state.user.email === undefined ? '': $store.state.user.email}}</span></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Account"
  }
</script>

<style scoped>
  #account {
    padding-top: 44px;
  }
</style>