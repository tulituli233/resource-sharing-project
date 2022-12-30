<template>
  <div class="chatList">
    <p>聊天列表</p>
    <div
      class="messageList"
      @click="toChatRoom(i)"
      v-for="(item, i) in ChatList"
      :key="i"
    >
      <div class="headImage">
        <!-- <img
          src="https://cdn.anime-pictures.net/previews/b35/b359040bcd84548d5f587d0ad0764f21_cp.png.avif"
          alt=""
        /> -->
        <Avatar :UserId="item.ToId"></Avatar>
      </div>
      <div class="dialogue">
        <div class="name_time">
          <div class="name">{{ item.ToName }}</div>
          <div class="time">
            {{
              item.msgList == undefined
                ? item.CreateTime
                : item.msgList[item.msgList.length - 1].CreateTime | dateFormat
            }}
          </div>
        </div>
        <div class="info">
          <div class="content">
            {{
              item.msgList == undefined
                ? ""
                : item.msgList[item.msgList.length - 1].ChatContent
            }}
          </div>
          <div class="number" v-if="newMsg(item)">
            <span v-text="newMsg(item)"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from "../My/Avatar.vue";
export default {
  components: { Avatar },
  name: "MyChats",
  created() {
    document.title = "资源共享--私信列表";
    let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    this.userInfo = userInfo;
  },
  data() {
    return {
      userInfo: {},
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
          if (item.Readed == 0 && item.FromId != this.userInfo.id) {
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
.chatList {
  margin-top: 20px;
  // background-color: rgb(237, 190, 190);
  p {
    padding: 8px;
  }
  .messageList {
    display: flex;
    // justify-content: space-between;
    align-items: center;
    border-top: 1px solid #9c9c9c;
    .headImage {
      margin: 10px;
      height: 50px;
      width: 50px;
      border-radius: 25px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .dialogue {
      width: 720px;
      .name_time {
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .name {
          // padding-left: 10px;
        }
        .time {
          color: #9c9c9c;
          font-size: 10px;
        }
      }
      .info {
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .content {
          // margin-top: 6px;
          // padding-left: 10px;
          padding-top: 7px;
          width: 95%;
          color: #9c9c9c;
          font-size: 13px;
          overflow: hidden; /*对超出容器的部分强制截取，高度不确定则换行*/
          text-overflow: ellipsis; /*显示省略符号来代表被修剪的文本。*/
          white-space: nowrap; /*禁止换行*/
        }
        .number {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          background-color: #ff679a;
          font-size: 12px;
          color: #f0f0f0;
          border-radius: 10px;
        }
      }
    }
  }
}
</style>