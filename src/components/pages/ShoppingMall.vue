<template>
    <div id="shopping">
        <!-- search babr layout -->
        <div class="search-bar">
            <van-row>
                <van-col span="2" ><img :src="locationIcon" width="100%" class="location-icon" /></van-col>
                <van-col span="18">
                   <input type="text" class="search-input">
                </van-col>
                <van-col span="4"><van-button size="mini">查找</van-button></van-col>
            </van-row>
        </div>
        <!-- swiper area -->
        <div class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image.uri" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- shopping nav -->
        <div class="type-bar">
            <div v-for="(cate,index) in category" :key="index">
                <img v-lazy="cate.image.uri" width="100%" />
                <span>{{cate.name}}</span>
            </div>
        </div>
        <!--AD banner area-->
        <div class="ad-banner">
            <img v-lazy="adBanner" width="100%">
        </div>
        <!-- Recommend goods area -->
        <div class="recommend-area">
            <div class="recommend-title">
                商品推荐
            </div>
            <div class="recommend-body">
                <!-- swiper -->
                <swiper :options='swiperOption'>
                    <swiper-slide v-for='(item,index) in recommendGoods' :key='index'>
                        <div class="recommend-item">
                            <img :src="item.image.uri" width="100%" >
                            <div>{{item.name}}</div>
                            <div>{{item['release-date']}}</div>
                        </div>
                    </swiper-slide>
                </swiper>
                <!-- <swiperDefault></swiperDefault> -->
                <!-- floor one area -->
                <!-- <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
                <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
                <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent> -->
            </div>
        </div>
        <!-- Hot Area -->
        <div class="hot-area">
          <div class="hot-title">热卖商品</div>
          <div class="hot-goods">
            <van-list>
              <van-row gutter="20">
                <van-col span='12' v-for="(item,index) in hotGoods" :key="index">
                  <goodsInfo :goodsImage="item.image.uri" :goodsName="item.name" :goodsPrices="item['release-date']"></goodsInfo>
                </van-col>
              </van-row>
            </van-list>
            <!-- list组件 -->
          </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import floorComponent from "../footComponents";
import {toMoney} from "@/filter/moneyFilter.js"
import goodsInfo from "../goodsInfoComponent"
import url from "@/servericeAPI.config.js"
// import swiperDefault from "../swiper/swiperDefault"
export default {
  data() {
    return {
      locationIcon: require("../../../static/location.png"),
      bannerPicArray: "",
      data: "",
      category: "",
      adBanner: "",
      recommendGoods: [],
      swiperOption: {
        slidesPerView: 2,
        slidesPerGroup: 1
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floor1_0: "",
      floor1_1: "",
      floor1_2: "",
      floorName:"",
      hotGoods:[]
    };
  },
  created() {
    axios({
      url:"./static/index.json",
      method: "get"
    })
      .then(response => {
        console.log( response.data.champions)
        // if (response.status == 200) {
        //   console.log(response);
          this.category = response.data.champions.splice(0,5);
          this.adBanner = response.data.factions[0].image.uri;
          this.bannerPicArray = response.data.factions;
          this.recommendGoods = response.data.champions.splice(7,10);
        //   this.floor1 = response.data.data.floor1;
        //   this.floor2 = response.data.data.floor3;
        //   this.floor3 = response.data.data.floor2;
        //   this.floorName = response.data.data.floorName;
          this.hotGoods  = response.data.champions
        // }
      })
      .then(error => {});
  },
  filters:{
    moneyFilter(money){
      return toMoney(money)
    }
  },
  methods: {},
  components: { floorComponent ,goodsInfo}
};
</script>

<style scoped>
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important;
  background-color: #e5017d;
  color: rgb(255, 255, 255);
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.van-swipe {
  height: 9rem;
}
.swiper-area {
  width: 20rem;
  clear: both;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
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
  background-color: #fff;
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
  border-right: 1px solid #eee;
  text-align: center;
}
.floor-anomaly {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.floor-anomaly div {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.floor-one {
  border-right: 1px solid #ddd;
}
.floor-two {
  border-bottom: 1px solid #ddd;
}
.floor-rule {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: #fff;
}
.floor-rule div {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 10rem;
  border-bottom: 1px solid #ddd;
}
.floor-rule div:nth-child(odd) {
  border-right: 1px solid #ddd;
}
.hot-goods{
  overflow: hidden;
}
.hot-area{
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
</style>