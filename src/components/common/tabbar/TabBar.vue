<template>
  <nav class="mui-bar mui-bar-tab is-fixed">
    <router-link class="mui-tab-item" to="/home">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">首页</span>
    </router-link>
    <router-link class="mui-tab-item" :to="$store.state.user === '' ? '/login' : '/classify' ">
      <span class="mui-icon mui-icon-bars"></span>
      <span class="mui-tab-label">分类</span>
    </router-link>
    <router-link class="mui-tab-item" :to="$store.state.user === '' ? '/login' : '/shop_car' ">
      <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
        <span class="mui-tab-label"></span>
      </span>
      <span class="mui-tab-label">购物车</span>
    </router-link>
    <router-link class="mui-tab-item" :to="$store.state.user === '' ? '/login' : '/user' ">
      <span class="mui-icon mui-icon-extra mui-icon-extra-peoples"></span>
      <span class="mui-tab-label">我的</span>
    </router-link>
  </nav>
</template>

<script>
  export default {
    name: "TabBar",
    data() {
      return {
        active: 0,
        totalCount: 0
      };
    },
    // created() {
    //   this.getGoodsTotalCount();
    // },
    methods: {
      getGoodsTotalCount() {
        this.$http.get('http://localhost:3000/api/getTotalCount')
          .then(result => {
            this.totalCount = result.data;
          }).catch(error => {
          console.log(error);
        });
      }
    }
  };
</script>

<style scoped>
</style>
