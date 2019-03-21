<template>
  <div id="app">
    <div class="main-div">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" @change="changeTabbar(active)">
      <van-tabbar-item icon="shop">首页</van-tabbar-item>
      <van-tabbar-item icon="records">列表页</van-tabbar-item>
      <van-tabbar-item icon="cart">购物车页</van-tabbar-item>
      <van-tabbar-item icon="contact" info="20">会员中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  },
  methods: {
    changeTabbar(active) {
      console.log(active);
      switch (active) {
        case 0:
          this.$router.push({ name: "home" });
          break;
        case 1:
          this.$router.push({ name: "categoryList" });
          break;
        case 2:
          this.$router.push({ name: "shopCart" });
          break;
        case 3:
          break;
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
