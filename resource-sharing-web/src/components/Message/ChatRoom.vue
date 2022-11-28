<!--<template>
  <div>chat</div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>

</style>-->

<template>
  <div class="home">
    <ul>
      <li v-for="item of msgList" :key="item.id">
        <p>
          <span>{{ item.user }}</span>
          <span>{{ new Date(item.dateTime) }}</span>
        </p>
        <p>{{ item.msg }}</p>
      </li>
    </ul>
    <input type="text" placeholder="" v-model="messageData.content" />
    <button @click="sendMessage()">发送</button>
    <button @click="test">test</button>
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
        FormId: 0,
        ToId: 8,
        yuyin: "",
        face: "",
        content: "qqq",
        imgs: "",
        nickName: "",
      },
    };
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
    this.sendMessage();
    // ws.addEventListener("open", this.handleWsOpen.bind(this), false);
    // ws.addEventListener("close", this.handleWsClose.bind(this), false);
    // ws.addEventListener("error", this.handleWsError.bind(this), false);
    // ws.addEventListener("message", this.handleWsMessage.bind(this), false);
  },
  methods: {
    test() {
      console.log(321);
      alert(321);
    },
    handleSendBtnClick() {
      console.log("111");
      const msg = this.msg;
      // if (!msg.trim().length) {
      //   return;
      // }
      ws.send(JSON.stringify());
      this.msg = "";
    },
    async sendMessage() {
      console.log(21);
      const { data: res } = await this.$http.post(
        "my/chat/sendmsg",
        this.messageData
      );
      console.log(res);
      //   if (res.meta.status > 301) return this.$message.error(res.meta.message);
      //   if (res.meta.status == 301) {
      //     return;
      //     this.$message.error(res.meta.message);
      //   }
      //   this.$message.success(res.meta.message);
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
