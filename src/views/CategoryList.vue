<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别分类"></van-nav-bar>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                @click="clickCategory(index,item.ID)"
                v-for="(item,index) in categoryList"
                :key="index"
                :class="{categoryActive:categoryIndex===index}"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="clickCategorySub">
              <van-tab
                v-for="(item,index) in categorySubList"
                :key="index"
                :title="item.MALL_SUB_NAME"
              ></van-tab>
            </van-tabs>
            <div id="list-div">
              <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                <van-list v-model="loading" :finished="finished" @load="onLoad">
                  <div class="list-item" v-for="(item,index) in goodList" :key="index" @click="goDetail(item.ID)">
                    <div class="list-item-img">
                      <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
                    </div>
                    <div class="list-item-text">
                      <div>{{item.NAME}}</div>
                      <div class>￥{{item.ORI_PRICE}}</div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      categoryList: [],
      categorySubList: [],
      categoryIndex: 0,
      active: 0,
      loading: false,
      finished: false,
      isRefresh: false,
      list: [],
      page: 1,
      goodList: [],
      categorySubId: "",
      errorImg: 'this.src="' + require("@/assets/errorimg.png") + '"'
    };
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      axios({
        url: "http://localhost:3000/goods/getCategoryList",
        method: "get"
      })
        .then(response => {
          if (response.data.code == 200) {
            this.categoryList = response.data.data;
            this.categorySub(this.categoryList[0].ID);
          }
        })
        .catch(err => {});
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page = 1;
      this.goodList = [];
      this.categorySub(categoryId);
    },
    categorySub(categoryId) {
      axios({
        url: "http://localhost:3000/goods/getCategorySubList",
        method: "post",
        data: {
          categoryId: categoryId
        }
      }).then(response => {
        if (response.data.code == 200) {
          this.categorySubList = response.data.data;
          this.categorySubId = this.categorySubList[0].ID;
          this.active = 0;
          this.onLoad();
        }
      });
    },
    clickCategorySub() {
      this.categorySubId = this.categorySubList[this.active].ID;
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.categorySubGood();
    },
    categorySubGood() {
      axios({
        url: "http://localhost:3000/goods/getCategorySubGood",
        method: "post",
        data: {
          page: this.page,
          categorySubId: this.categorySubId
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.data.length) {
            this.page++;
            this.goodList = this.goodList.concat(response.data.data);
          } else {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySubList[0].ID;
        this.categorySubGood();
      }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = true;
        this.list = [];
        this.onLoad();
      }, 500);
    },
    goDetail(id){
      this.$router.push({path:'/goodInfo',query:{goodsId:id}})
    }
  },
  mounted() {
    let widHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = widHeight - 46 + "px";
    document.getElementById("list-div").style.height = widHeight - 90 + "px";
  }
};
</script>
<style scoped>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background: #fff;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
