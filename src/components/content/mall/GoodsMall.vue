<template>
  <div id="goodsMall">
    <div class="mui-navbar-inner mui-bar mui-bar-nav mui-row">
      <div class="mui-col-sm-2 mui-col-xs-2">
        <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
          <span class="mui-icon mui-icon-left-nav"></span>返回
        </button>
      </div>
      <div class="search mui-col-sm-10 mui-col-xs-10">
          <input v-model="keyWords" type="search" placeholder="搜点啥">
      </div>
    </div>
    <div class="allItem">
      <!--v-for循环loadGoods方法返回的根据关键字过滤后的数组-->
      <div class="goodsItem" v-for="item in loadGoods(keyWords)" :key="item.goods_id">
        <router-link :to="'/home/goodsMall/goodsInfo/' + item.goods_id">
          <img src="../../../assets/img/meinv.jpg" height="150px" width="100%"/>
        </router-link>
        <h3 style="font-size: 14px">{{item.goods_describe}}</h3>
        <div class="info">
          <p class="price">
            <span>￥{{item.goods_price | priceFormat}}</span>
            <span @click="addToShopCar(item.goods_id)" class="mui-pull-right mui-icon mui-icon-extra mui-icon-extra-cart"></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsMall",
    data() {
      return {
        goods: '',
        keyWords: ''
      }
    },
    // created() {
    //   this.loadGoods();
    // },
    methods: {
      addToShopCar(id) {
        console.log("加入购物车");
        console.log(id);
      },
      loadGoods(keyword) {
        this.$http.get('http://localhost:3000/api/loadGoods')
          .then(result => {
            // console.log(result.data);
            // this.goods = result.data;    //将响应数据赋值
            //根据关键字进行搜索，并显示。（任意字符串都包括空字符""，所以，页面加载时加载所有）
            this.goods = result.data.filter(item => {
              if (item.goods_describe.includes(keyword)) {   //根据商品描述包含的关键字显示
                return true;    //filter返回是Boolean类型，为true时将 item 放入新数组。
              }
            });
          }).catch(error => {
          console.log(error);
        });
        return this.goods;
      }
    }
  }
</script>

<style scoped>
  #goodsMall {
    padding-top: 44px;
    width: 100%;
  }
  .search {
    display: flex;
    justify-content: space-between;
  }
  .allItem {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .allItem:after {    /*单数时实现最后一个左对齐*/
    content: "";    /*填充一个空元素，使单数时变成双数*/
    flex: 1 0 40%;
    margin: 5px;
  }
  .goodsItem {
    border: 1px solid lightgray;
    flex: 1 0 40%;
    margin: 5px;
    color: #000;
  }

  .price {
    margin: 0 5px;
  }
</style>