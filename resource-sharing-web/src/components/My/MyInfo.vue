<template>
  <div>
    <el-form
      :model="addFrom"
      :rules="addFromRules"
      ref="addFormRef"
      label-width="100px"
      label-position="top"
    >
      <el-form-item label="邮箱" prop="Email">
        <el-input v-model="addFrom.Email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="addFrom.phone"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="brief">
        <el-input type="textarea" :rows="3" v-model="addFrom.brief"></el-input>
      </el-form-item>
      <!-- 修改资料按钮 -->
      <el-button type="primary" class="btnAdd" @click="updataInfo('addFormRef')"
        >修改资料</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePhone = (rule, value, callback) => {
      //正则表达式
      let reg_tel =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (!reg_tel.test(value)) {
        callback(new Error("电话号码不符合要求"));
      } else {
        callback();
      }
    };
    return {
      addFrom: {
        Email: "",
        brief: "",
        phone: "",
      },
      addFromRules: {
        Email: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 1,
            max: 45,
            message: "长度在 1 到 45 个字符",
            trigger: "blur",
          },
        ],
        brief: [
          { required: true, message: "请输入文章简介", trigger: "blur" },
          {
            min: 1,
            max: 255,
            message: "长度在 1 到 255 个字符",
            trigger: "blur",
          },
        ],
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
      },
    };
  },
  created() {
    document.title = "资源共享--我的资料";
  },
  methods: {
    updataInfo(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return;
        let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
        const { data: res } = await this.$http.post("/my/userinfo/updata", {
          UserId: userInfo.id,
          Email: this.addFrom.Email,
          Phone: this.addFrom.phone,
          Brief: this.addFrom.brief,
        });
        //   console.log(res);
        if (res.meta.status > 301) return this.$message.error(res.meta.message);
        if (res.meta.status == 301) {
          return;
          this.$message.error(res.meta.message);
        }
        this.$message.success(res.meta.message);
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>