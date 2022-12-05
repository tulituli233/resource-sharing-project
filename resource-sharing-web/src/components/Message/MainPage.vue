<template>
  <div class="MainPageBox">
    <div class="headBox">
      <div class="headImg">头像</div>
      <div class="name">{{ MainPageData.IssuerName }}</div>
      <div class="Data">
        <div class="fll Followers">
          <span class="bigFZ">{{ MPD.Followers }}</span
          ><br /><span>粉丝</span>
        </div>
        <div class="fll Sharers">
          <span class="bigFZ">{{ MPD.Sharers }}</span
          ><br /><span>关注</span>
        </div>
        <div class="fll Lisks">
          <span class="bigFZ">{{ MPD.Likes }}</span
          ><br /><span>获赞</span>
        </div>
      </div>
      <div class="isMy" v-if="userInfo.id != MainPageData.IssuerId">
        <el-button
          icon="el-icon-chat-dot-round"
          @click="toChatRoom"
          type="success"
          size="medium"
          class="sendBtn"
        >
          私信
        </el-button>
        <el-button
          class="followBtn"
          :class="isfollow == 0 ? '' : 'followed'"
          @click="addFollow"
          size="medium"
        >
          {{ isfollow == 0 ? "+ 关注" : "已关注" }}
        </el-button>
      </div>
      <div v-else class="NoMy">
        <el-button type="success" @click="toMyInfo">编辑资料</el-button>
      </div>
    </div>
    <div class="sharBox">
      分享
      <ArticleList :ArticleList="ArticleList"></ArticleList>
    </div>
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
    let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    this.userInfo = userInfo;
    this.isFollow();
    this.getMPD();
    this.getMyShare();
  },
  data() {
    return {
      MainPageData: {
        IssuerId: 0,
        IssuerName: "",
      },
      userInfo: {},
      isfollow: 0,
      MPD: {},
      ArticleList: [],
    };
  },
  methods: {
    toMyInfo() {
      this.$router.push("/myInfo");
    },
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
      //   this.$message.success(res.meta.message);
      this.$store.commit("saveChatList", res.data.ChatList);
      //
      res.data.ChatList.forEach((item, i) => {
        if (this.MainPageData.IssuerId == item.ToId) {
          this.$store.commit("saveChatListIndex", i);
        }
      });
      this.$router.push("/chat");
    },
    async isFollow() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.get("/my/userinfo/isfollow", {
        params: {
          FollowerId: userInfo.id,
          WriterId: this.MainPageData.IssuerId,
        },
      });
      console.log("isFollow==", res);
      // if (res.meta.status !== 200) {
      //   this.isfollow = 0;
      //   return;
      // }
      this.isfollow = 0;
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return this.$message.error(res.meta.message);
      }
      this.isfollow = 1;
    },
    async addFollow() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      if (userInfo.id == this.$store.state.ArticleInfo.IssuerId)
        return this.$message.error("不能关注自己");
      const { data: res } = await this.$http.post("/my/userinfo/follow", {
        FollowerId: userInfo.id,
        WriterId: this.MainPageData.IssuerId,
        WriterName: this.MainPageData.IssuerName,
        FollowState: this.isfollow == 0 ? 1 : 0,
        CreateTime: Date.now() + "",
      });
      console.log(res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return this.$message.error(res.meta.message);
      }
      // this.$message.success(res.meta.message);
      this.isFollow();
    },
    async getMPD() {
      const { data: res } = await this.$http.post("/my/userinfo/getmpd", {
        UserId: this.MainPageData.IssuerId,
      });
      console.log(res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return this.$message.error(res.meta.message);
      }
      //   this.$message.success(res.meta.message);
      this.MPD = res.data.userInfo;
    },
    async getMyShare() {
      //   let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.get("/my/article/getmyshare", {
        params: {
          IssuerId: this.MainPageData.IssuerId,
        },
      });
      console.log("getMyShare", res);
      // alert(res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return this.$message.error(res.meta.message);
      }
      //   this.$message.success(res.meta.message);
      this.ArticleList = res.data.alist;
    },
  },
};
</script>

<style lang="less" scoped>
.MainPageBox {
  .headBox {
    overflow: hidden;
    .headImg {
      float: left;
      width: 60px;
    }
    .name {
      float: left;
      line-height: 70px;
      margin: 0 10px;
      font-size: 24px;
    }
    .Data {
      float: left;
      margin: 0 10px;
      .fll {
        float: left;
        padding: 10px;
        text-align: center;
        .bigFZ {
          font-size: 24px;
        }
      }
    }
    .isMy {
      float: left;
      .sendBtn {
        margin-top: 15px;
      }
      .followBtn {
        margin-top: 20px;
      }
    }
    .NoMy {
      float: left;
      padding-top: 20px;
      padding-left: 10px;
    }
  }
  .sharBox {
    margin-top: 20px;
    width: 800px;
  }
}
</style>