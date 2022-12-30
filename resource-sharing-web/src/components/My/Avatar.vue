<template>
  <div class="AvatarBox" :style="`width: ${width}px;height: ${height}px;`">
    <el-avatar
      size="large"
      class="avatar"
      v-if="avatar !== '无'"
      :src="`uploads/avatar/${avatar}`"
    ></el-avatar>
    <el-avatar v-else size="large" class="avatar">{{
      userInfo.Username == "..." ? Username : userInfo.Username
    }}</el-avatar>
  </div>
</template>

<script>
export default {
  name: "Avatar",
  created() {
    if (this.UserId !== 0) {
      this.getMPD();
      // console.log(333);
    } else {
      this.userInfo.HeadImgUrl = this.HeadImgUrl;
      this.userInfo.Username = this.Username;
    }
    // console.log(444);
  },
  data() {
    return {
      userInfo: {
        HeadImgUrl: "无",
        Username: "...",
      },
    };
  },
  computed: {
    avatar: {
      get() {
        if (this.HeadImgUrl !== "无") {
          return this.HeadImgUrl;
        }
        return this.userInfo.HeadImgUrl;
      },
    },
  },
  props: {
    UserId: {
      type: Number,
      default: 0,
    },
    HeadImgUrl: {
      type: String,
      default: "无",
    },
    Username: {
      type: String,
      default: "...",
    },
    width: {
      type: Number,
      default: 50,
    },
    height: {
      type: Number,
      default: 50,
    },
  },
  methods: {
    async getMPD() {
      const { data: res } = await this.$http.post("/my/userinfo/getmpd", {
        UserId: this.UserId,
      });
      // console.log(res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return this.$message.error(res.meta.message);
      }
      //   this.$message.success(res.meta.message);
      this.userInfo.HeadImgUrl = res.data.userInfo.HeadImgUrl;
      this.userInfo.Username = res.data.userInfo.username;
      // console.log("res.data.userInfo.username;", res.data.userInfo.username);
    },
  },
};
</script>

<style lang="less" scoped>
.AvatarBox {
  width: 50px;
  height: 50px;
  span {
    width: 100%;
    height: 100%;
  }
}
</style>