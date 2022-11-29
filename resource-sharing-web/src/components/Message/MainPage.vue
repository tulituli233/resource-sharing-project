<template>
  <div class="MainPageBox">
    <el-button icon="el-icon-chat-dot-round" @click="toChatRoom" type="success">
      私信
    </el-button>
  </div>
</template>

<script>
export default {
  created() {
    document.title = "资源共享--主页";
    // let IssuerId = this.$route.query.IssuerId;
    // let IssuerName = this.$route.query.IssuerName;
    // this.IssuerId=IssuerId;
    // this.IssuerName=IssuerName;
    // console.log(IssuerId);
    // console.log(IssuerName);
    this.MainPageData = this.$store.state.MainPageData;
  },
  data() {
    return {
      MainPageData: {
        IssuerId: 0,
        IssuerName: "",
      },
    };
  },
  methods: {
    async toChatRoom() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      let chatList = {
        FromId: userInfo.id,
        FromName: userInfo.username,
        ToId: this.MainPageData.IssuerId,
        ToName: this.MainPageData.IssuerName,
        CreateTime: Date.now() + "",
      };
      console.log(chatList);
      const { data: res } = await this.$http.post(
        "my/chat/addchatlist",
        chatList
      );
      console.log(res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        this.$message.error(res.meta.message);
        return;
      }
      this.$message.success(res.meta.message);
      this.getChatList();
    },
    // 获取私聊数据
    async getChatList() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.get("my/chat/chatList", {
        params: {
          UserId: userInfo.id,
        },
      });
      console.log(res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.$store.commit("saveChatList", res.data.ChatList);
      this.$store.commit("saveChatListIndex", res.data.ChatList.length - 1);
      this.$router.push("/chat");
    },
  },
};
</script>

<style lang="less" scoped>
</style>