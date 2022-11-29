<!--<template>
  <div>chat</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>

</style>-->

<template>
  <div class="chatRoomBox">
    <div class="chatBox">
      <div class="friendNmae">{{ ChatListItem.ToName }}</div>
      <div class="chatListBox">
        <ul>
          <li
            class="liItem"
            v-for="item of ChatListItem.msgList"
            :key="item.chatId"
            :class="item.FromId == ChatListItem.FromId ? 'MyLi' : ''"
          >
            <p>
              <span>{{
                item.FromId == ChatListItem.FromId
                  ? ChatListItem.FromName
                  : ChatListItem.ToName
              }}</span
              ><br />
              <span v-text="toTime(item.CreateTime)"></span>
            </p>
            <span class="msgBox">{{ item.ChatContent }}</span>
          </li>
        </ul>
      </div>
      <div class="sendChat">
        <el-input v-model="messageData.content"> </el-input>
        <el-button icon="el-icon-s-promotion" @click="sendMessage"
          >发送</el-button
        >
      </div>
    </div>
    <!-- <input type="text" placeholder="" v-model="messageData.content" />
    <button @click="sendMessage">发送</button> -->
  </div>
</template>

<script>
// @ is an alias to /src
// const ws = new WebSocket("ws://localhost:8008");

export default {
  name: "HomeView",
  created() {
    let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    this.FromId = userInfo.id;
    this.Username = userInfo.username;
  },
  data() {
    return {
      FromId: 0,
      msg: "",
      Username: "",
      msgList: [],
      messageData: {
        Pimg: "",
        Dimg: "",
        FromId: 0,
        ToId: 0,
        yuyin: "",
        face: "",
        content: "",
        imgs: "",
        CreateTime: "",
      },
    };
  },
  computed: {
    ChatListItem() {
      let ChatListItem =
        this.$store.state.ChatList[this.$store.state.ChatListIndex];
      console.log(ChatListItem);
      return ChatListItem;
    },
  },
  mounted() {
    // this.username = localStorage.getItem("username");
    // if (!this.username) {
    //   this.$router.push("/login");
    //   return;
    // }

    // ws.addEventListener("message", this.handleWsMessage.bind(this), false);

    // ws.onSocketMessage(function (msg) {
    //   console.log("这个就是返回回来的数据");
    // });
    let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    this.messageData.FromId = userInfo.id;
    // this.sendMessage();
    // ws.addEventListener("open", this.handleWsOpen.bind(this), false);
    // ws.addEventListener("close", this.handleWsClose.bind(this), false);
    // ws.addEventListener("error", this.handleWsError.bind(this), false);
    // ws.addEventListener("message", this.handleWsMessage.bind(this), false);
  },
  methods: {
    toTime(time) {
      let t = new Date(time - 0).toLocaleString();
      return t;
    },
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
    },
    async sendMessage() {
      // console.log(21);
      this.messageData.CreateTime = Date.now() + "";
      this.messageData.ToId = this.ChatListItem.ToId;
      const { data: res } = await this.$http.post(
        "my/chat/sendmsg",
        this.messageData
      );
      console.log(res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        this.$message.error(res.meta.message);
        return;
      }
      this.$message.success(res.meta.message);
      this.messageData.content = "";
      // this.msgList.push(res.data.chat);
      this.getChatList();
    },
    handleWsOpen(e) {
      //   console.log("open", e);
      console.log("open");
      ws.send(
        JSON.stringify({
          uid: "id1",
        })
      );
    },
    handleWsClose(e) {
      console.log("close", e);
    },
    handleWsError(e) {
      console.log("error", e);
    },
    handleWsMessage(e) {
      console.log("message321", e);
      //   const msg = JSON.parse(e.data);
      //   if(Array.isArray(msg)){
      //     this.msgList=msg;
      //   }
      // this.msgList.push(msg);
    },
  },
};
</script>

<style lang="less" scoped>
.chatRoomBox {
  .chatBox {
    position: relative;
    width: 800px;
    .friendNmae {
      position: absolute;
      top: 0;
      left: 0;
      width: 729px;
      padding: 20px;
      color: #fff;
      background-color: #12b7f5;
      text-align: center;
      font-size: 25px;
      font-weight: 600;
    }
    .chatListBox {
      // width: 800px;
      width: 100%;
      height: 1000px;
      overflow: auto;
      background-color: #e5e5e5;
      padding: 60px 0;
      ul {
        width: 749px;
        padding: 10px;
        overflow: hidden;
        .liItem {
          width: 550px;
          float: left;
          list-style: none;
          .msgBox {
            padding: 10px;
            background-color: #fff;
            border-radius: 10px;
          }
        }
        .MyLi {
          float: right;
          p {
            text-align: right;
          }
          // background-color: #12B7F5;
          .msgBox {
            background-color: #12b7f5;
            color: #fff;
            // text-align: right;
            float: right;
          }
        }
      }
    }
    .sendChat {
      padding: 10px;
      position: absolute;
      bottom: 0;
      width: 94%;
      background-color: #F1F1F1;
      .el-input {
        width: 80%;
      }
      .el-button {
        width: 17%;
        color: #fff;
        background-color: #12b7f5;
      }
    }
  }
}
</style>