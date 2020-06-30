<template>
  <div id="home" class="mui-page">
    <header id="header" class="mui-bar mui-bar-nav is-fixed">
      <a class="mui-action-back mui-icon mui-pull-left"></a>
      <h1 class="mui-title">主页</h1>
    </header>
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newsList">
          <span class="mui-icon mui-icon-map"></span>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/photosList">
          <span class="mui-icon mui-icon-image"></span>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/goodsMall">
          <span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="">
          <span class="mui-icon mui-icon-email-filled"></span>
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="">
          <span class="mui-icon mui-icon-videocam"></span>
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="">
          <span class="mui-icon mui-icon-phone-filled"></span>
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>

  export default {
    name: "HomeContainer",

  }
</script>

<style scoped>
  /*.mint-swipe {  !*使用轮播图时有的一个大的div 中有一个 类，默认高度是0*!*/
  /*    height: 150px;*/
  /*}*/
  #home {
    padding-top: 44px;
  }

  /*每一个轮播图也有一个 div */
  .mint-swipe-item:nth-child(1) {
    background-color: #4cd964;
  }

  .mint-swipe-item:nth-child(2) {
    background-color: #007aff;
  }

  .mint-swipe-item:nth-child(3) {
    background-color: hotpink;
  }

  .mui-grid-view.mui-grid-9 {
    background-color: #ffffff;
    border: none;
  }

  .mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0;
  }
</style>