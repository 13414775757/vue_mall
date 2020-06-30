<template>
  <div>
    <h5>发表评论</h5> 
    <textarea v-model="commentBody" placeholder="请输入内容（不超过50字）" maxlength="50"></textarea>
    <mt-button type="primary" size="large" @click="postComment()">评论</mt-button>
    <!-- 如果vuex中state评论内容不为空，显示所有评论 -->
    <div v-if="$store.state.commentContent[0].comment_body">
      <div class="comment" v-for="item in $store.state.commentContent" :key="item.commentTime">
        <div class="comment_title">
          <mt-badge size="small" color="#888" class="commentHead">
            <span>用户：{{item.nickname}}</span>
            <span>{{item.comment_time | dataFormat}}</span>
          </mt-badge>
        </div>
        <p class="comment_content">
          <span>评论内容：{{item.comment_body}}</span>
          <span class="mui-pull-right mui-icon mui-icon-extra mui-icon-extra-like">0</span>
        </p>
      </div>
    </div>
    <!-- 否则评论为空，显示没有人评论 -->
    <div v-else>
      <p style="text-align: center; margin-top: 30px">还没有人评论</p>
    </div>
    <!--        <mt-button type="danger" icon="more" size="large" plain>加载更多</mt-button>-->
  </div>
</template>

<script>
  import {Toast} from 'mint-ui';
  
  export default {
    name: "Comment",
    data() {
      return {
        commentBody: '',
      }
    },
    created() {
    },
    methods: {
      postComment() {
        if (this.$store.state.user === '') {
          return Toast('请先登录');
        }
        //trim()方法去掉头尾空格
        if (this.commentBody.trim().length === 0) {
          return Toast('评论内容不能为空');
        }
        this.$http.post('http://localhost:3000/api/postComment', {
          //传递请求参数
          id: this.$route.params.id,
          commentBody: this.commentBody,
          nickname: this.$store.state.user.nickname,
        }).then(result => {
          // console.log(result);
          //评论成功重新加载
          //向父组件发射一个方法，调用父组件(NewsInfo.vue)方法 (刷新评论)
          this.$emit('function');
        }).catch(error => {
          console.log(error);
        });
        //评论完成清空输入框
        this.commentBody = '';
      }
    },
  }
</script>

<style scoped>
  .comment {
    margin-top: 5px;
  }
  textarea {
    font-size: 14px;
  }
  .commentHead {
    display: flex;
    justify-content: space-between;
  }

  .comment_content {
    padding: 5px;
  }

  .mui-icon-extra {
    font-size: 12px;
  }
</style>