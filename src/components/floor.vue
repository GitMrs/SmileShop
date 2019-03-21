<template>
  <div class="floor">
    <div class="floor-anomaly">
      <div class="floor-one">
        <img :src="floor1_0" alt="floor1_0" width="100%">
      </div>
      <div>
        <div class="floor1_1">
          <img :src="floor1_1" width="100%" alt="floor1_1">
        </div>
        <img :src="floor1_2" alt="floor1_2" width="100%">
      </div>
    </div>
    <div class="floor-rule">
      <div class v-for="(item,index) in  floor1.slice(3)" :key="index">
        <img src="item.img" alt width="100%">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:['floor1'],
  watch:{
    // floor1:(val) => {
    //   this.floor1_0 = this.floor1[0]
    //   this.floor1_1 = this.floor1[1]
    //   this.floor1_2 = this.floor1[2]
    // }
  }
};
</script>
<style scoped>
.floor-anomaly {
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}
.floor-anomaly div {
  width: 10rem;
  box-sizing: border-box;
}
.floor-anomaly .floor1_0 {
  border-right: 1px solid #ddd;
}
.floor-anomaly .floor1_1 {
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
</style>
