<template>
  <div id="shop">
    <div id="header" class="mui-bar mui-bar-nav is-fixed">
      <button type="button" class="mui-left mui-action-back mui-btn  mui-btn-link mui-btn-nav mui-pull-left">
        <span class="mui-icon mui-icon-left-nav"></span>返回
      </button>
      <h1 class="mui-title">购物车</h1>
    </div>
    <div class="goodsItem" v-if="this.allGoodsItem">
      <ul class="mui-table-view" v-for="item in allGoodsItem" :key="item.car_id">
        <li class="mui-table-view-cell mui-media">
          <div class="mui-row">
            <div class="mui-col-sm-1 mui-col-xs-1">
              <input :checked="item.item_check" type="checkbox" @click="getItemPrice(item.item_check, item.car_id)">
            </div>
            <div class="mui-col-sm-8 mui-col-xs-8" @click="$router.push('/home/goodsMall/goodsInfo/'+item.item_id)">
              <img class="mui-media-object mui-pull-left" src="../../assets/img/meinv.jpg" width="50px"
                   height="50px">
              <span class="describe">{{item.item_describe}}</span>
              <p style="overflow: hidden">{{item.item_color}}，{{item.item_size}}码</p>
              <p style="color: orange;">￥{{item.item_price*item.item_count | priceFormat}}</p>
            </div>
            <div class="mui-col-sm-3 mui-col-xs-3">
              <button @click="deleteItem(item.car_id)" class="mui-btn-danger mui-pull-right">删除</button>
              <div class="count">
                <span><button size="small" @click="subCount(item.car_id, item.item_count)">-</button></span>
                <input maxlength="3" @blur="changeCount(item.car_id, item.item_count)" v-model="item.item_count" class="itemCount">
                <span><button size="small" @click="addCount(item.car_id)">+</button></span>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="carFooter mui-bar mui-bar-footer">
        <div class="mui-pull-left" style="line-height: 44px">
          <input type="checkbox">全选
        </div>
        <div class="mui-pull-right" style="line-height: 44px">
          <span>合计：￥{{totalMoney === null ? 0 : totalMoney | priceFormat}}</span> &nbsp;
          <button class="mui-btn mui-btn-yellow">结算</button>
        </div>
      </div>
    </div>
    <div v-else style="margin-top: 50%; text-align: center">
      <span>毛都没有，空空如也</span>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  export default {
    name: "ShopCarContainer",
    data() {
      return {
        allGoodsItem: '',
        isCheck: false,
        totalMoney: 0,
      }
    },
    mounted() {
      this.loadGoodsItem();
    },
    methods: {
      //加载商品
      loadGoodsItem() {
        this.$http.get('http://localhost:3000/api/loadItem')
          .then(result => {
            this.allGoodsItem = result.data[0];
            this.totalMoney = (result.data[1])[0].price;
          }).catch(error => {
          return error;
        });
      },
      //删除商品
      deleteItem(id) {
        this.$http.delete('http://localhost:3000/api/deleteItemById', {
          data: {
            id
          }
        }).then(result => {
          if (result.status === 200) {
           Toast({
              message: '删除成功',
              duration: 1000,
              position: 'middle'
            });
            this.loadGoodsItem();
          }
        }).catch(error => {
          console.log(error);
        });
      },
      //减少购买数量
      subCount(id, count) {
        if (count <= 1) {
          return  Toast({
            message: '该宝贝不能减少了呦~',
            duration: 1000,
            position: 'bottom'
          });
        }
        this.$http.get('http://localhost:3000/api/subCount', {
          params: {
            id
          }
        }).then(result => {
          // console.log(result);
          this.loadGoodsItem();
        }).catch(error => {
          console.log(error);
        });
      },
      //添加购买数量
      addCount(id) {
        this.$http.get('http://localhost:3000/api/addCount', {
          params: {
            id
          }
        }).then(result => {
          // console.log(result);
          this.loadGoodsItem();
        }).catch(error => {
          console.log(error);
        });
      },
      //改变购买数量（未完成）
      changeCount(id, count) {
        console.log(typeof parseInt(count));
        console.log(parseInt(count).this.charAt(0));
      },
      //计算选中的价格
      getItemPrice(check, id) {  
        if (parseInt(check) === 1) {
          check = 0;
        } else {
          check = 1;
        }
        // console.log(check);
        this.$http.post('http://localhost:3000/api/getPrice', {
            carId: id,
            check,
        }).then(result => {
          this.loadGoodsItem();
        }).catch(error => {
          console.log(error);
        });
        
      }
    },
    $watch: {

    }
  }
</script>

<style scoped>
  #shop {
    padding-top: 44px;
    /*background-color: lightgray;*/
    padding-bottom: 44px;
  }

  .goodsItem {
    margin: 10px;
  }

  .mui-table-view { /*ul标签*/
    border-radius: 10px;
    /*position: unset;*/
  }

  li {
    margin: 10px;
  }
  .itemCount {
    width: 35px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-size: 12px;
  }
  .describe {
    font-size: 14px;
  }

  .count {
    display: inline-flex;
  }

  .count button {
    text-align: center;
    padding: 2px 6px;
  }
  .carFooter {
    padding-bottom: 94px;
  }
</style>