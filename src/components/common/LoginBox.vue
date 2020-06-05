<!--  -->
<template>
  <div class="login-box">
    <toast v-show="tipIsShow" class="tip">{{tipMsg}}</toast>
    <dt v-show="isShow">
      <dl v-for="(item,index) in loginText" @click="itemClick(index)">{{item}}</dl>
      <!-- <dl>管理员入口</dl> -->
    </dt>
    <form v-show="formIsShow" action method="post" target="nm_iframe">
      <span for="username">Username:</span>
      <input type="text" v-model="loginInfo.name" name="name" />
      <span for="password">Password:</span>
      <input type="password" v-model="loginInfo.password" name="password" autocomplete="on" />
      <span @click="submit">提交</span>
    </form>

    <iframe id="id_iframe" name="nm_iframe" style="display:none;"></iframe>
  </div>
</template>

<script>
import Toast from "components/common/Toast";

export default {
  name: "LoginBox",
  data() {
    return {
      isShow: true,
      formIsShow: false,
      tipIsShow: false,
      loginText: ["游客逛逛", "管理员入口"],
      loginInfo: { name: "", password: "" },
      tipMsg: ""
    };
  },
  components: {
    Toast
  },
  methods: {
    itemClick(index) {
      if (index == 1) {
        this.isShow = false;
        this.formIsShow = true;
      } else {
        console.log("那你去别处逛吧");
      }
    },
    submit() {
      let infoName = this.loginInfo.name;
      let infoPassword = this.loginInfo.password;
      this.$http
        .get("/api/getUserInfo", { params: { name: infoName } })
        .then(res => {
          console.log(res);
          if (res.data.length === 0) {
            console.log("查不到此用户");
            this.tipMsg = "查不到此用户";
            this.tipIsShow = true;
            setTimeout(() => {
              this.tipIsShow = false;
            }, 2000);
          } else {
            if (res.data[0].name === infoName) {
              if (res.data[0].password === infoPassword) {
                console.log("密码正确");
                this.tipMsg = "密码正确，欢迎您。正在跳转……";
                this.tipIsShow = true;
                this.$store.state.loginStatus = true;
                setTimeout(() => {
                  this.tipIsShow = false;
                  this.$router.replace("/admin");
                }, 1000);
              } else {
                this.tipMsg = "密码错误,在想想";
                this.tipIsShow = true;
                setTimeout(() => {
                  this.tipIsShow = false;
                }, 2000);
              }
            } else {
              console.log("无此用户");
            }
          }
        });
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {}
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.login-box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  background-color: var(--color-tint);
}
dt {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
dl {
  width: 200px;
  padding: 5px 0px;
  margin-bottom: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  color: var(--color-tint);
  background-color: #fff;
  font-size: 24px;
  font-weight: 500;
}
dl:hover {
  width: 300px;
  height: 50px;
  line-height: 50px;
  cursor: pointer;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
form span {
  color: #fff;
  margin-bottom: 5px;
}
form input {
  margin-bottom: 10px;
}
.submit {
  margin-top: 10px;
  padding: 3px 0;
}
</style>