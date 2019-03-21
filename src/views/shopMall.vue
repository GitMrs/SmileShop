<template>
  <div>
    <van-row gutter="5" class="search-bar">
      <van-col span="3">
        <img :src="loactionIcon" width="50%" class="location-icon">
      </van-col>
      <van-col span="16">
        <input type="text" class="search-input">
      </van-col>
      <van-col span="5">
        <van-button size="mini">查找</van-button>
      </van-col>
    </van-row>
    <van-row class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img v-lazy="banner.imageUrl" width="100%">
        </van-swipe-item>
      </van-swipe>
    </van-row>
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%">
        <span>{{category.mallCategoryName}}</span>
      </div>
    </div>
    <div class="add-banner">
      <img :src="adBanner.PICTURE_ADDRESS" alt="100%">
    </div>
    <div class="recommend-area">
      <div class="recommend-title">推荐商品</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%">
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price}} (￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floor :floor1="floor1"/>
  </div>
</template>
<script>
import axios from "axios";
// const response = require('../lib/data.js')
import floor from "components/floor.vue";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  data() {
    return {
      loactionIcon: require("../assets/location.jpg"),
      bannerPicArray: [
        {
          imageUrl: ""
        },
        {
          imageUrl: ""
        },
        {
          imageUrl: ""
        }
      ],
      category: [],
      adBanner:[],
      recommendGoods:[],
      floor1:[]
    };
  },
  components: {
    swiper,
    swiperSlide,
    floor
  },
  created() {
    // console.log(response)
    // this.bannerPicArray = response.data.slides;
    // this.category = response.data.category;
    // this.adBanner = response.data.advertesPicture;
    // this.recommendGoods = response.data.recommendGoods;
    // this.floor1 = response.data.floor1;
    if (localStorage.userInfo) {
      Toast.success("您已经登录");
      this.$router.push("/");
    }
    axios
      .get({
        url: "/lib/data.json",
        method: "get"
      })
      .then(response => {
        if (response.status == 200) {
          // this.bannerPicArray = response.data.data.slides;
          // this.category = response.data.data.category;
          // this.adBanner = response.data.data.advertesPicture;
          // this.recommendGoods = response.data.data.recommendGoods;
          // this.floor1 = response.data.data.floor1;
        }
      });
  }
};
</script>
<style scoped>
.search-bar {
  height: 2.2rem;
  background: #e5017d;
  line-height: 2.2rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important;
  background: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swiper-area {
  width: 20rem;
  clear: both;
}
.type-bar {
  background: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.recommend-area {
  background: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  bottom: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
</style>
