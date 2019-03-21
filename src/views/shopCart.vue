<template>
  <div class="cart">
    <div class="cart-nav">
      <van-nav-bar title="购物车"/>
      <div class="card-title">
        <van-button size="small" type="danger" @click="clearCart" plain>清空购物车</van-button>
      </div>
    </div>
    <div class="card-list">
      <div class="pang-row" v-for="(item,index) in cartInfo" :key="index">
        <div class="pang-img">
          <img :src="item.image" width="100px" alt="11" :onerror="errorImg">
        </div>
        <div class="pang-text">
          <div class="pang-goods-name">{{item.Name}}</div>
          <div class="pang-control">
            <van-stepper v-model="item.count"></van-stepper>
          </div>
        </div>
        <div class="pang-goods-price">
          <div>￥{{item.price | moneyFilter}}</div>
          <div>x{{item.count}}</div>
          <div class="allPrice">￥{{item.price*item.count | moneyFilter}}</div>
        </div>
      </div>
    </div>
    <div class="totleMoney">商品总价格￥{{totalMoney | moneyFilter}}</div>
  </div>
</template>
<script>
import { toMoney } from "../lib/filter.js";
export default {
  data() {
    return {
      cartInfo: [],
      isEmpty: true,
      errorImg: "this.src=" + require("@/assets/errorimg.png") + '"'
    };
  },
  created() {
    this.getCartInfo();
    this.changeTabBarActive();
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    getCartInfo() {
      //判断localStorage里是否有购物车数据
      if (localStorage.cartInfo) {
        //如果有数据，我们去除并赋值给cartInfo
        this.cartInfo = JSON.parse(localStorage.cartInfo);
      }
      //打印到控制台查看效果
      console.log(" this.cartInfo:" + JSON.stringify(this.cartInfo));
      this.isEmpty = this.cartInfo.length > 0 ? true : false;
    },
    clearCart() {
      localStorage.removeItem("cartInfo");
      this.cartInfo = [];
    },
    changeTabBarActive() {
      this.nowPath = this.$route.path;
      if (this.nowPath == "/Cart") {
        this.active = 2;
      }
    }
  },
  computed: {
    totalMoney() {
      let allMoney = 0;
      this.cartInfo.forEach((item, index) => {
        allMoney += item.price * item.count;
      });
      localStorage.cartInfo = JSON.stringify(this.cartInfo);
      return allMoney;
    }
  }
};
</script>
<style scoped>
.card-title {
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
  text-align: right;
}
.cart-list {
  background: #fff;
}
.pang-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  padding: 0.5rem;
  font-size: 0.85rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
.pang-row .pang-img {
  flex: 6;
}
.pang-row .pang-text {
  flex: 14;
  padding-left: 10px;
}
.pang-control {
  padding-top: 10px;
}
.pang-row .pang-goods-price {
  flex: 4;
  text-align: right;
  align-content: center;
  justify-content: center;
}
.totleMoney {
  text-align: right;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  padding: 5px;
}
</style>
