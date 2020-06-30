<template>
  <div id="classify">
    <header id="header" class="mui-bar mui-bar-nav is-fixed">
      <h1 class="mui-title">分类</h1>
      <span class="mui-icon mui-icon-search mui-pull-right"></span>
    </header>
    <div class="mui-row">
      <div class="mui-col-xs-3 mui-col-sm-3">
        <ul class="mui-table-view">
          <li class="mui-table-view-cell" v-for="item in allClasses" :key="item.class_id">
            <a :class="[{active:checkIndex === item.class_id}]" @click="getClassGoods(item.class_id)">
              {{item.class_name}}
            </a>
          </li>
        </ul> 
      </div>
      <div class="classAllItem mui-col-xs-9 mui-col-sm-9"> 
        <div class="classItem" v-for="item in allCommodity" :key="item.commodity_id">
          <router-link :to="'/classify/goodsByClass/' + item.commodity_id" class="imgItem">
            <img src="../../assets/img/meinv.jpg" height="140px" width="100%">
          </router-link>
          <div class="itemInfo">
            <h3 style="font-size: 14px">{{item.comm_describe}}</h3>
            <span class="price">￥{{item.comm_price | priceFormat}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "classifyContainer",
    data() {
      return {
        checkIndex: 1,
        allClasses: '',
        allCommodity: ''
      }
    },
    created() {
      //组件挂载前加载
      this.loadAllClasses();
      //由于默认第一个选中，所有挂载前将第一个默认选中的商品加载
      this.getClassGoods(1);
    },
    methods: {
      //加载所有分类
      loadAllClasses() {
        this.$http.get('http://localhost:3000/api/getClasses')
        .then(result => {
          // console.log(result.data);
          this.allClasses = result.data;
          this.selected = this.allClasses[0];
          // console.log(this.selected);
          
        }).catch(error => {
          console.log(error);
          
        });
      },
      //根据分类获取
      getClassGoods(id)  {
        // console.log(id);
        this.checkIndex = id;
        this.$http.get('http://localhost:3000/api/getCommodity', {
          params: {
            id
          }  
        }).then(result => {
          // console.log(result);
          this.allCommodity = result.data;
        });
      }
    }
  }
</script>

<style scoped>
  #classify {
    padding-top: 44px;
  }
  .mui-table-view-cell {
    text-align: center;
    height: 100%;
  }
  .classAllItem:after {    /*单数时实现最后一个左对齐*/
    content: "";    /*填充一个空元素，使单数时变成双数*/
    flex: 1 0 45%;
    margin: 5px;
  }
  .classAllItem {
    color: #000;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }
  .classItem {
    border: 1px solid gray;
    flex: 1 0 45%;
    margin: 5px;
  }
  /* v-bind:class样式绑定，选中样式 */
  .active {   
    transition: all .8s;
    background-color: rgba(96, 209, 20, 0.548);
    color: #fff;
  }
  .price {
    color: orange;
    margin: 0 5px;
  }
</style>