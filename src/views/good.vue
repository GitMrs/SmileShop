<template>
  <div class="navbar-div">
    <van-nav-bar title="商品详情" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="topimage-div">
      <img :src="goodInfo.IMAGE1" width="100%" alt="imgae" :onerror="errorImg">
    </div>
    <div class="goods-name">{{goodInfo.NAME}}</div>
    <div class="goods-price">价格:{{goodInfo.PRESENT_PRICE | moneyFilter}}</div>
    <div>
      <van-tabs swipeable sticky>
        <van-tab title="商品详情">
          <div class="detail" v-html="goodInfo.DETAIL"></div>
        </van-tab>
        <van-tab title="评论">制作中。。。。</van-tab>
      </van-tabs>
    </div>
    <div class="goods-bottom">
      <div>
        <van-button size="large" @click="addShopCart" type="primary">加入购物车</van-button>
      </div>
      <div>
        <van-button size="large" type="primary">直接购买</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { toMoney } from "../lib/filter.js";
import axios from "axios";
export default {
  data() {
    return {
      goodInfo: {},
      goodsId: "775e575ce28a4f89b1dfe2c99eb08ae7",
      errorImg: 'this.src="' + require("@/assets/errorimg.png") + '"'
    };
  },
  created() {
    this.goodsId = this.$route.query.goodsId
      ? this.$route.query.goodsId
      : this.$route.params.goodsId;
    this.getGoodInfo();
  },
  methods: {
    getGoodInfo() {
      axios
        .post("http://localhost:3000/goods/getDetailGoodInfo", {
          goodId: this.goodsId
        })
        .then(response => {
          if (response.data.code == 200) {
            this.goodInfo = response.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    addShopCart() {
      let cartInfo = localStorage.cartInfo
        ? JSON.parse(localStorage.cartInfo)
        : [];
      let isHaveGoods = cartInfo.find(cart => cart.goodId === this.goodsId);
      if (!isHaveGoods) {
        let newGoodsInfo = {
          goodsId: this.goodInfo.ID,
          Name: this.goodInfo.NAME,
          price: this.goodInfo.PRESENT_PRICE,
          image: this.goodInfo.IMAGE1,
          count: 1
        };
        cartInfo.push(newGoodsInfo); //添加到购物车
        localStorage.cartInfo = JSON.stringify(cartInfo); //操作本地数据
        Toast.success("添加成功");
      } else {
        Toast.suceess("购物车已有该商品");
      }
      this.$router.push({ name: "shopCart" });
    }
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>
<style scoped>
.detail {
  font-size: 0px;
}
.goods-name {
  background-color: #fff;
}
.goods-price {
  background-color: #fff;
}
.goods-bottom {
  position: fixed;
  bottom: 50px;
  left: 0;
  background: #fff;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-flow: nowrap;
}
.goods-bottom > div {
  flex: 1;
  padding: 5px;
}
</style>
