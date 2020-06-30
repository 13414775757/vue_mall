<template>
  <div id="goodsInfo">
    <header class="mui-navbar-inner mui-bar mui-bar-nav">
      <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
        <span class="mui-icon mui-icon-left-nav"></span>返回
      </button>
      <h1 class="mui-center mui-title">商城</h1>
      <router-link to="/shop_car" title="购物车" class="mui-pull-right mui-icon mui-icon-extra mui-icon-extra-cart"></router-link>
    </header>
    <div class="goodsMsg">
      <img src="../../../assets/img/meinv.jpg" height="250px" width="100%"/>
      <p class="info">
        <span class="price">￥{{}}</span>
        <span class="describe" style="display: block">{{}}</span>
      </p>
    </div>
    <div class="selectStyle">
      <span class="word mui-pull-left">选择颜色,尺码></span>
      <select class="style" name="style">
              onmousedown="if(this.options.length>3){this.size=5}" onblur="this.size=0" onchange="this.size=0">
        <option>
          颜色：{{}}，尺寸：{{}}
        </option>
      </select>
      <span class="mui-badge">已选择:{{}}、{{}}码</span>
    </div>
    <div class="addCar mui-bar mui-bar-footer">
      <span></span>
      <span></span>
      <div class="mui-pull-right">
        <button @click="postToShopCar" class="mui-btn mui-btn-yellow" size="large">加入购物车</button>
        <button class="mui-btn mui-btn-yellow" size="large">立即购买</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  #goodsInfo {
    padding-top: 44px;
  }

</style>