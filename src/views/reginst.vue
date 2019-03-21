<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack"/>
    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        :error-message="usernameErrorMsg"
        @click-icon="username = ''"
      ></van-field>
      <van-field v-model="password" :error-message="passwordErrorMsg" type="password" label="密码" placeholder="请输入密码" required></van-field>
      <div class="register-button">
        <van-button type="primary" :loading='openLoading' @click='registerAction' size="large">马上注册</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import {Toast} from 'vant';
import axiso from 'axios';
export default {
  data() {
    return {
      username: "",
      password: "",
      usernameErrorMsg:'',
      passwordErrorMsg:'',
      openLoading:false
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    registerAction(){
      this.checkForm() && this.registerFn()
    },
    registerFn(){
      this.openLoading = true
      axiso.post( 'http://localhost:3000/user/regist',{userName:this.username,password:this.password}).then(response => {
        
        if(response.code == 200){
          Toast.success('注册成功')
          this.$router.push('/login')
        }else{
          Toast.fail('注册失败')
          this.openLoading = false
        }
      }).catch((err) => {
        Toast.fail('注册失败')
        console.log(err)
        this.openLoading = false
      })
    },
    checkForm(){
      let isOk = true
      if(this.username.length < 2){
        this.usernameErrorMsg = '用户名不能小于2位'
        isOk = false
      }else{
        this.usernameErrorMsg = ''
      }
      if(this.password.length < 3){
        this.passwordErrorMsg = '密码不能少于3位'
        isOk = false
      }else{
        this.passwordErrorMsg = ''
      }
      return isOk;
    }
  }
};
</script>
<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>
