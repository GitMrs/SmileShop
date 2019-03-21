<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack"/>
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
      <van-field
        v-model="password"
        :error-message="passwordErrorMsg"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      ></van-field>
      <div class="register-button">
        <van-button type="primary" :loading="openLoading" @click="loginAction" size="large">马上登录</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import axiso from "axios";
export default {
  data() {
    return {
      username: "",
      password: "",
      usernameErrorMsg: "",
      passwordErrorMsg: "",
      openLoading: false
    };
  },
  creatd: () => {
    if (localStorage.userInfo) {
      Toast.success("您已经登录");
      this.$router.push("/");
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    loginAction() {
      this.checkForm() && this.loginFn();
    },
    loginFn() {
      this.openLoading = true;
      axiso
        .post("http://localhost:3000/user/login", {
          userName: this.username,
          password: this.password
        })
        .then(response => {
          if (response.data.code == 200) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.username };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch(err => {
                Toast.fail("登录状态保存失败");
                console.log(err);
              });
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch(err => {
          Toast.fail("登录失败");
          console.log(err);
          this.openLoading = false;
        });
      // console.log(this.username,this.password)
    },
    checkForm() {
      let isOk = true;
      if (this.username.length < 3) {
        this.usernameErrorMsg = "用户名不能小于3位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password.length < 3) {
        this.passwordErrorMsg = "密码不能少于3位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
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
