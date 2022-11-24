<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <div class="regOrLogin" @click="regOrLogin">
        <span>{{ tipStr }}</span>
      </div>
      <el-form
        :rules="rules"
        label-width="0px"
        class="login_form"
        :model="form"
        ref="loginForm"
      >
        <el-form-item prop="name">
          <el-input prefix-icon="el-icon-user" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="success" @click="login" v-if="isLogin"
            >登录</el-button
          >
          <el-button type="primary" @click="regUser" v-else>注册</el-button>
          <el-button type="info" @click="reForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        name: "",
        password: "123456",
      },
      isLogin: true,
      tipStr:'去注册',
      res: {},
      rules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" }, //trigger触发事件
          { min: 3, max: 20, message: "长度在3到10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在6到15个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    document.title = "资源共享--登录";
  },
  methods: {
    regOrLogin(){
      let l=this.isLogin;
      this.tipStr=l?'登录':'去注册';
      this.isLogin=!l;
    },
    reForm() {
      this.$refs.loginForm.resetFields(); //resetFields表单清空
      console.log(this.res);
      alert(this.res.data.data.token);
    },
    login() {
      this.$refs.loginForm.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        try {
          const { data: res } = await this.$http.post("/ours/login", {
            Username: this.form.name,
            Password: this.form.password,
          });
          console.log(res);
          // alert(res);
          if (res.meta.status !== 200)
            return this.$message.error(res.meta.message);
          this.$message.success(res.meta.message);
          window.sessionStorage.setItem("token", res.data.token);
          window.sessionStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
          // alert(res.data.token);
          this.$router.push("/home");
        } catch (e) {
          console.log(2);
        }
        console.log(3);
      });
    },
    // 用户注册
    async regUser() {
      const { data: res } = await this.$http.post("/ours/reguser", {
        Username: this.form.name,
        Password: this.form.password,
      });
      console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.$message.success(res.meta.message);
      window.sessionStorage.setItem("token", res.data);
      this.regOrLogin();
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
  position: relative;
  .regOrLogin {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 10px;
    color: blue;
  }
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
