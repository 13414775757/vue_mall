<template>
  <div id="pictureList" class="mui-page">
    <!--头部-->
    <header id="header" class="mui-bar mui-bar-nav is-fixed">
      <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
        <span class="mui-icon mui-icon-left-nav"></span>返回
      </button>
      <h1 class="mui-center mui-title">图片</h1>
    </header>
    <!--选项卡-->
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">美女</mt-tab-item>
      <mt-tab-item id="2">动漫</mt-tab-item>
      <mt-tab-item id="3">游戏</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected" style="margin-top: 20px">
      <mt-tab-container-item id="1">
        <span></span>
        <img src="../../../assets/img/meinv.jpg" style="width: 100%; height: 300px;"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <span></span>
        <img src="../../../assets/img/hyrz.jpg" style="width: 100%; height: 200px;"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <span></span>
        <img src="../../../assets/img/yxlm.jpg" height="200" width="100%"/>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  export default {
    name: "PhotosList",
    data() {
      return {
        selected: 1,
        content: ''
      }
    },
    created() {

    },
    methods: {}

  }
</script>

<style scoped>
  #pictureList {
    padding-top: 44px;
  }

  * {
    touch-action: pan-y;
  }
</style>