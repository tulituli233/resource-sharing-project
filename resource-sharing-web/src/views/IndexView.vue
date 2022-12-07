<template>
  <div class="IndexViewBox">
    <div class="LunBox">
      <el-carousel :interval="3000" type="card" height="200px">
        <el-carousel-item v-for="item in ArticleList" :key="item.ArticleId">
          <img :src="item.FirstImgUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="ALBox">
      <ArticleList :ArticleList="ArticleList"></ArticleList>
    </div>
    <!-- <el-button @click="rews"></el-button> -->
  </div>
</template>

<script>
// import ArticleList from '@/components/Article/ArticleList.vue'
export default {
  // components:{
  //   ArticleList
  // },
  name: "IndexView",
  data() {
    return {
      LunList: [],
      queryInfo: {
        cate: "",
        mark: "",
        pagenum: 1,
        pagesize: 5,
        hasSelect: false,
      },
      ArticleList: [],
      ws: "",
    };
  },
  created() {
    document.title = "资源共享--首页";
    this.getArticleList();
  },
  // mounted() {
  //   console.log("loo");
  //   const ws = new WebSocket("ws://localhost:8008");
  //   ws.addEventListener("open", this.handleWsOpen.bind(this), false);
  //   ws.addEventListener("close", this.handleWsClose.bind(this), false);
  //   ws.addEventListener("error", this.handleWsError.bind(this), false);
  //   ws.addEventListener("message", this.handleWsMessage.bind(this), false);
  //   this.ws = ws;
  //   // this.rews();
  // },
  methods: {
    rews() {
      // const ws = new WebSocket("ws://localhost:8008");
      console.log("re");
    },
    handleWsOpen(e) {
      //   console.log("open", e);
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      console.log("open233");
      this.ws.send(
        JSON.stringify({
          uid: userInfo.id,
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
      console.log("message23", e);
      //   const msg = JSON.parse(e.data);
      //   if(Array.isArray(msg)){
      //     this.msgList=msg;
      //   }
      // this.msgList.push(msg);
    },
    async getArticleList() {
      const { data: res } = await this.$http.post(
        "/my/article/alist",
        this.queryInfo
      );
      // console.log(res.data.alist);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return;
        this.$message.error(res.meta.message);
      }
      // this.$message.success(res.meta.message);
      let alists = [];
      if (typeof res.data.alist[0].Tags == "string") {
        alists = res.data.alist.map((item) => {
          item.Tags = item.Tags.split(",");
          item.Tags.pop();
          return item;
        });
      }
      this.ArticleList = alists;
      // this.$store.dispatch("indexArticleListAys", res.data.alist);
      // this.$store.commit("indexArticleList", res.data.alist);
      // window.sessionStorage.setItem("token", res.data);
    },
  },
};
</script>

<style lang="less" scoped>
.IndexViewBox {
  .LunBox {
    width: 800px;
    background-color: #fff;
    .el-carousel__item {
      width: 332px;
      height: 166px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ALBox {
    margin-top: 20px;
    width: 800px;
  }
}
</style>