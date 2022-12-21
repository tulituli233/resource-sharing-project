<template>
  <div class="chatRoomBox" @mousewheel="UpChat">
    <div class="chatBox">
      <div class="friendNmae">{{ ChatListItem.ToName }}</div>
      <div
        class="chatListBox"
        :class="isW96"
        v-if="ChatListItem.msgList != undefined"
      >
        <a id="ABottom" href="#chat" target="_self"></a>
        <ul>
          <li
            class="liItem"
            v-for="(item, i) of ChatListItem.msgList"
            :key="item.chatId"
            :class="item.FromId == ChatListItem.FromId ? 'MyLi' : ''"
            :id="i == ChatListItem.msgList.length - 10 ? 'chat' : ''"
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
            <span class="read" :class="item.Readed == 0 ? 'cheng' : 'hui'">{{
              item.Readed == 0 ? "未读" : "已读"
            }}</span>
          </li>
        </ul>
        <!-- <div id="chat"></div> -->
      </div>
      <div class="chatListBox NoChatList ws96" v-else>
        私聊已经建立，现在你们可以交流了~~~
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
  name: "ChatRoom",
  created() {
    let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    this.FromId = userInfo.id;
    this.Username = userInfo.username;
    this.$nextTick(() => {
      if (this.ChatListItem.msgList != undefined) {
        ABottom.click();
      }
      console.log(21);
    });
  },
  mounted() {
    // alert(21);
    // this.$nextTick(() => {
    //   ABottom.click();
    //   console.log(21);
    // });
  },
  data() {
    return {
      FromId: 0,
      msg: "",
      Username: "",
      msgList: [],
      lastReaded: 0,
      lastFromId: 0,
      UpChatFlag: 1,
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
      // console.log("tcp2");
      let ChatListItem =
        this.$store.state.ChatList[this.$store.state.ChatListIndex];
      // console.log(ChatListItem.msgList != undefined);
      if (ChatListItem.msgList != undefined) {
        // console.log("tcp3");
        let lastChat = ChatListItem.msgList[ChatListItem.msgList.length - 1];
        let LR = lastChat.Readed;
        this.lastReaded = LR;
        this.lastFromId = lastChat.FromId;
        // console.log(this.hasNotRead);
      }
      return ChatListItem;
    },
    isW96() {
      if (this.ChatListItem.msgList == undefined) {
        return "ws96";
      } else {
        if (this.ChatListItem.msgList.length >= 9) {
          return "";
        }
        return "ws96";
      }
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
      let t = new Date(time - 0).toLocaleString("zh", { hour12: false });
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
    // 变为已读
    async UpChat() {
      console.log(1);
      if (
        this.lastReaded == 0 &&
        this.lastFromId == this.ChatListItem.ToId &&
        this.UpChatFlag == 1
      ) {
        this.UpChatFlag = 0;
        // console.log('this.UpChatFlag==',this.UpChatFlag);
        let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
        const { data: res } = await this.$http.get("my/chat/UpChat", {
          params: {
            ToId: userInfo.id,
            FromId: this.ChatListItem.ToId,
          },
        });
        this.UpChatFlag = 1;
        // console.log('this.UpChatFlag==',this.UpChatFlag);
        console.log(res);
        if (res.meta.status > 301) return this.$message.error(res.meta.message);
        if (res.meta.status == 301) {
          return this.$message.error(res.meta.message);
        }
        this.$message.success(res.meta.message);
        this.getChatList();
      }
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
          .read {
            margin-left: 10px;
          }
          .hui {
            color: #999;
          }
          .cheng {
            color: #fca60b;
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
          .read {
            float: right;
            line-height: 40px;
            padding-right: 10px;
          }
        }
      }
    }
    .ws96 {
      width: 96.5%;
      height: auto;
    }
    .sendChat {
      padding: 10px;
      position: absolute;
      bottom: 0;
      width: 94%;
      background-color: #f1f1f1;
      .el-input {
        width: 80%;
      }
      .el-button {
        width: 17%;
        color: #fff;
        background-color: #12b7f5;
      }
    }
    .NoChatList {
      text-align: center;
      padding-top: 100px;
      padding-bottom: 100px;
      font-size: 20px;
    }
  }
}
</style>