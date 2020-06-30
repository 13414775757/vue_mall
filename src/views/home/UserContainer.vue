<template>
  <div id="mine">
    <header id="header" class="mui-bar mui-bar-nav is-fixed">
      <h1 class="mui-title">我的</h1>
    </header>
    <Mine></Mine>
  </div>
</template>

<script>
  import Mine from '../../components/content/mine/Mine.vue';
  export default {
    name: "SearchContainer",
    components: {
      Mine,
    }
  }
</script>

<style scoped>

</style>