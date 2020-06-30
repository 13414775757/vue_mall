<template>
  <div class="newsList mui-page">
    <header class="mui-navbar-inner mui-bar mui-bar-nav">
      <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
        <span class="mui-icon mui-icon-left-nav"></span>返回
      </button>
      <h1 class="mui-center mui-title">新闻</h1>
      <!-- 下拉按钮 -->
      <a href="#subMenu" class="mui-tab-item mui-btn-link mui-pull-right">
        <span class="mui-icon mui-icon-plusempty"></span>
      </a>
    </header>
    <ul class="mui-table-view" v-for="item in news" :key="item.id">
      <li class="mui-table-view-cell mui-media">
        <router-link :to="'/home/newsInfo/'+ item.id">
          <div class="mui-media-body">
            <h4>{{item.title}}</h4>
            <p class='content'>
              <span>发表时间：{{item.time | dataFormat}}</span>
              <span class="mui-pull-right mui-icon mui-icon-eye">{{item.seeTimes}}次</span>
            </p>
          </div>
        </router-link>
      </li>
    </ul>
    <!--下拉菜单-->
    <div id="subMenu" class="mui-popover mui-bar-popover" style="background-color: gray">
      <div class="mui-popover-arrow"></div>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <router-link to="/home/writeNews" class="mui-icon mui-icon-plus-filled">写文章</router-link>
        </li>
        <li class="mui-table-view-cell">
          <a href="#" class="mui-icon mui-icon-gear-filled">设置</a>
        </li>
        <li class="mui-table-view-cell">
          <a href="#" class="mui-icon mui-icon-email-filled">帮助与反馈</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "NewList",
    data() {
      return {
        news: ''
      }
    },
    created() {
      //组件创建时加载新闻列表
      axios({
        url: 'http://localhost:3000/api/newsList',
        method: 'get'
      }).then(result => {
        // console.log(result.data);
        this.news = result.data;
      });
    },
    methods: {}
  }
</script>

<style scoped>
  .newsList {
    padding-top: 44px;
  }
  .content .mui-icon {
    line-height: unset;
    font-size: 12px;
  }
  .mui-popover {
    width: unset;
  }
  .mui-popover .mui-table-view {
    background-color: lightgray;
  }
  .mui-popover .mui-popover-arrow:after {
    background-color: lightgray;
  }
  .mui-table-view-cell a {
    font-size: 14px;
  }
</style>