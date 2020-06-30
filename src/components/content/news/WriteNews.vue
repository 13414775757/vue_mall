<template>
  <div id="write">
    <div class="mui-navbar-inner mui-bar mui-bar-nav">
      <button class="mui-left mui-action-back mui-btn mui-btn-link mui-btn-nav mui-pull-left">
        <span class="mui-icon mui-icon-left-nav"></span>返回
      </button>
      <mt-button @click="postBlog" size="small" class="postNews mui-pull-right">发送</mt-button>
    </div>
    <div class="blogBody">
      <input type="text" v-model="newsTitle" placeholder="标题">
      <textarea v-model="newsContent" placeholder="分享新鲜事..." rows="5"></textarea>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  export default {
    name: "WriteNews",
    data() {
      return {
        newsTitle: '',
        newsContent: ''
      }
    },
    methods: {
      postBlog() {
        if (this.$store.state.user === '') {
          return Toast('请先登录！');
        }
        if (this.newsTitle === '' && this.newsContent === '') {
          return Toast('请输入标题或内容！');
        }
        this.$http.post('http://localhost:3000/api/sendNews', {
          title: this.newsTitle,
          content: this.newsContent,
        }).then(result => {
          if (result.status === 200) {
            //成功，清空输入框
            this.newsTitle = '';
            this.newsContent = '';
            Toast('发表成功!');
            this.$router.push('/home/newsList');
          }
        }).catch(error => {
          return error;
        });
      }
    }
  }
</script>

<style scoped>
  #write {
    padding-top: 44px;
  }
  .blogBody {
    margin-top: 10px;
  }
  .postNews {
    top: 5px;
    border-radius: 10px;
    vertical-align: middle;
    background-color: orange;
    color: white;
  }
</style>