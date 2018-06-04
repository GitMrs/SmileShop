<template>
    <div class="good-info">
        <div class="goods-image">
            <img v-lazy="goodsImage" width="90%" />
            <div class="goods-name">{{goodsName}}</div>
            <div class="goods-price">{{goodsPrices}}</div>
        </div>
    </div>
</template>
<script>
import {toMoney} from "@/filter/moneyFilter.js"
export default {
    props:["goodsImage","goodsName","goodsPrices"],
    filters:{
        moneyFilter(money){
            return toMoney(money)
        }
    }
}
</script>
<style scoped>
.goods-name{
    padding: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
