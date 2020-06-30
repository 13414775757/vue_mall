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
        <span class="price">￥{{goods.goods_price | priceFormat }}</span>
        <span class="describe" style="display: block">{{goods.goods_describe}}</span>
      </p>
    </div>
    <div class="selectStyle">
      <span class="word mui-pull-left">选择颜色,尺码></span>
      <select class="style" name="style" v-model="selectStyle"
              onmousedown="if(this.options.length>3){this.size=5}" onblur="this.size=0" onchange="this.size=0">
        <option v-for="item in selectable" :value="item" :key="item.item_id">
          颜色：{{item.color}}，尺寸：{{item.size}}
        </option>
      </select>
      <span class="mui-badge">已选择:{{selectStyle.color}}、{{selectStyle.size}}码</span>
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
  import {Toast} from 'mint-ui';

  export default {
    name: "GoodsInfo",
    data() {
      return {
        id: this.$route.params.id,  //获取路由中的id
        selectable: '',   //存储数据库获取的商品样式
        goods: '',         //存储数据库中获取的商品
        selectStyle: '',
      }
    },
    created() {
      this.loadGoodsInfo();
      this.getSize();
    },
    methods: {
      //根据商品id加载对应商品
      loadGoodsInfo() {
        // console.log(this.id);
        this.$http.get('http://localhost:3000/api/loadGoodsInfo/?id=' + this.id)
          .then(result => {
            // console.log(result);
            this.goods = result.data[0];
          }).catch(error => {
          return error;
        });
      },
      //获取所有样式尺寸
      getSize() {
        this.$http.get('http://localhost:3000/api/getSize')
          .then(result => {
            // console.log(result);
            this.selectable = result.data;
            this.selectStyle = this.selectable[0];
          }).catch(error => {
          return error;
        });
      },
      //加入购物车
      postToShopCar() {
        if (this.$store.state.user === '') {
          return Toast('请先登录!');
        }
        // console.log(this.id);
        let order = {
          id: this.id,
          styleHadSelect: this.selectStyle,
          goodsInfo: this.goods,
        };
        //将订单数据提交服务器
        this.$http.post('http://localhost:3000/api/addGoodsItem', {
          order,
        }).then(result => {
          // console.log(result);
          if (result) {
            Toast('添加成功，快去看看吧');
          }
        }).catch(error => {
          return error;
        });
      },
    }
  }
</script>

<style scoped>
  #goodsInfo {
    padding-top: 44px;
  }

  .goodsMsg {
    background-color: white;
  }

  .price {
    font-size: 16px;
    color: orange;
  }

  .word {
    font-size: 14px;
  }

  .describe {
    font-size: 16px;
    color: black;
  }

  .selectStyle {
    margin-top: 5px;
    background-color: white;
  }

  .addCar {
    margin-top: 20px;
  }
</style>