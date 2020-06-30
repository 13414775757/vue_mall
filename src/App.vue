<template>
  <div class="app-container">
    <!--    中间主体路由-->
    <transition>  <!--设置切换动画-->
      <router-view/> <!--显示component中的所有组件-->
    </transition>

    <!--底部 Footer 匹配如果以home或者member,shop_car,user结尾才显示。-->
    <TabBar v-if="this.$route.path.match(/(home|classify|shop_car|user)$/)">
    </TabBar>
  </div>
</template>

<script>
  import TabBar from "./components/common/tabbar/TabBar.vue";

  export default {
    name: "App",
    components: {
      TabBar,
    }
  }
</script>

<style scoped>
  .app-container {
    overflow-x: hidden; /*解决x方向切换动画时超出屏幕时有滚动条*/
    position: absolute;
    padding-bottom: 50px; /*解决底部滚动显示不完整*/
    width: 100%;
    height: 100%;
  }
  .v-enter { /*进入与离开分开实现动画，保证一个页面进时另一个页面也在出*/
    opacity: 0;
    transform: translateX(100%);
  }

  .v-leave-to {
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
  }

  .v-enter-active, .v-leave-active {
    transition: all 0.5s ease;
  }

  * {
    touch-action: pan-y;
  }
</style>