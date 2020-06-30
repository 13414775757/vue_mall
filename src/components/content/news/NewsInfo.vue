<template>
  <div id="newsInfo" class="mui-page">
    <!--头部区-->
    <div class="mui-navbar-inner mui-bar mui-bar-nav">
      <button type="button" class="mui-left mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left">
        <span class="mui-icon mui-icon-left-nav"></span>返回
      </button>
      <h1 class="mui-center mui-title">#{{newsInfo.title}}#</h1>
    </div>
    <!--标题区-->
    <h3 class="title">{{newsInfo.title}}</h3>
    <p class="mui-subtitle">
      <span>发表时间：{{ newsInfo.time | dataFormat}}</span>
      <span class="mui-icon mui-icon-eye mui-pull-right">{{newsInfo.seeTimes}}次</span>
    </p>
    <hr>
    <!--内容区-->
    <div id="content">
      {{newsInfo.content}}
    </div>
    <hr>
    <!--发表评论;(子组件Comment.vue发射的方法，调用父组件getNewsInfo方法实现评论的刷新)-->
    <Comment v-on:function="getNewsInfo"></Comment>
  </div>
</template>

<script>
  import Comment from "./comment/Comment.vue";
  import axios from 'axios';

  export default {
    name: "NewsInfo",
    components: {
      Comment
    },
    data() {
      return {
        //获取到列表页传过来的id，然后判断id是多少传给后端服务器
        id: this.$route.params.id,
        newsInfo: {},
      }
    },
    created() {
      //console.log(this.id);
      //created在组件创建时调用方法完成加载。
      this.getNewsInfo();
    },
    methods: {
      //根据新闻携带的id获取到对应的新闻内容信息
      getNewsInfo() {
        axios({
          url: 'http://localhost:3000/api/newsInfo/?id=' + this.id,
          method: 'get'
        }).then(result => {
          // console.log(JSON.parse(result.request.response));
          this.newsInfo = JSON.parse(result.request.response)[0];
          //JSON.parse(result.request.response)将字符串转为对象
          this.$store.commit('getComments', JSON.parse(result.request.response));
        });
      },
      back() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style scoped>
  #newsInfo {
    padding-top: 44px;
  }

  .title {
    padding: 5px;
    font-size: 15px;
    text-align: center;
  }

  .mui-subtitle {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    padding: 0 4px;
    color: #007aff;
  }

  .mui-subtitle .mui-icon {
    line-height: unset;
    font-size: 12px;
  }

  #content {
    font-size: 14px;
    margin: 0px 5px 20px; /*上、左右、下*/
  }
</style>