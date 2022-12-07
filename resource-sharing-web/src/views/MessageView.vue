<template>
  <div class="message">
    <div class="messageBody">
      <div class="notice">
        <div class="notice_item">
          <i class="el-icon-chat-dot-square"></i>
          <router-link class="My-router-link" :to="{ path: '/myChats' }"
            >私信</router-link
          >
        </div>
        <div class="notice_item">
          <i class="el-icon-chat-dot-round"></i>
          <router-link class="My-router-link" :to="{ path: '/myComments' }"
            >回复</router-link
          >
        </div>
        <div class="notice_item">
          <i class="iconfont icon-dianzan"></i>
          <router-link class="My-router-link" :to="{ path: '/myLikes' }"
            >收到的赞</router-link
          >
        </div>
        <div class="notice_item">
          <i class="iconfont icon-zhifu"></i>
          <router-link class="My-router-link" :to="{ path: '/mySell' }"
            >兑换消息</router-link
          >
        </div>
        <div class="notice_item">
          <i class="iconfont icon-laba"></i>
          <router-link class="My-router-link" :to="{ path: '/sysNotice' }"
            >系统通知</router-link
          >
        </div>
      </div>
      <div class="MsgRouterBox">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessageView",
  created() {
    document.title = "资源共享--消息";
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  computed: {
    ChatList() {
      return this.$store.state.ChatList;
    },
  },
  methods: {
    toTime(time) {
      if (time == undefined) {
        return new Date().toLocaleString();
      }
      let t = new Date(time - 0).toLocaleString();
      return t;
    },
    // handleSizeChange(val) {
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
    // },
    toChatRoom(i) {
      this.$store.commit("saveChatListIndex", i);
      this.$router.push("/chat");
      console.log(i);
    },
    newMsg(item) {
      let CLi = item;
      // console.log(CLi);
      let newMsgNum = 0;
      if (CLi.msgList != null) {
        CLi.msgList.forEach((item) => {
          if (item.Readed == 0) {
            newMsgNum++;
          }
        });
      }
      return newMsgNum;
    },
  },
};
</script>

<style lang="less" scoped>
.message {
  margin: 10px 0 0 10px;
  width: 800px;
  .messageBody {
    .notice {
      // background-color: rgb(206, 197, 197);
      display: flex;
      justify-content: space-around;
      height: 110px;
      .notice_item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
        i {
          padding-top: 10px;
          // padding-bottom:-10px ;
          font-size: 40px;
          color: rgb(88, 184, 200);
          padding-bottom: 20px;
          // margin: 20px 0 0 4px;
        }
        .My-router-link {
          // margin-right: 20px;
          color: #000;
          text-decoration: none;
          position: absolute;
          width: 80px;
          /* height: 100px; */
          top: 0;
          /* vertical-align: text-top; */
          padding-top: 80px;
          text-align: center;
        }
      }
    }
  }
}
.iconfont {
  width: 40px;
  height: 40px;
  // padding-right: 10px;
}
</style>