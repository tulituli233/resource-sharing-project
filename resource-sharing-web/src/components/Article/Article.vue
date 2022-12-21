<template>
  <div class="ArticleBox">
    <h2>{{ Article.Title }}</h2>
    <div class="IssuerBox">
      <span @click="toMainPage(Article.IssuerId, Article.IssuerName)">
        {{ Article.IssuerName }}&nbsp;&nbsp;创建于
      </span>
      <span class="spanTime" v-text="toTime(Article.CreateTime)"></span>
    </div>
    <div class="ContentBox" v-html="Article.Content">{{ Article.Content }}</div>
    <div class="LianjieBox">
      资源链接：{{
        Article.LianJie == null
          ? "该资源为积分资源，你还没有兑换该资源！"
          : Article.LianJie
      }}
      <el-button
        class="BuyBtn"
        size="mini"
        type="success"
        v-if="Article.LianJie == null"
        @click="buyA(Article.Price)"
        >兑换</el-button
      >
    </div>
    <!-- 评分 -->
    <div class="rateBox">
      <div class="Arate">
        评分：
        <el-rate
          :value="Article.Grade / 20"
          disabled
          show-score
          text-color="#ff9900"
          :score-template="Article.Grade + ''"
        >
        </el-rate>
      </div>
      <div class="Myrate" v-if="Article.LianJie == null">
        需要兑换后，才能评分哦~！
      </div>
      <div class="Myrate" v-else>
        我的评分：
        <el-rate
          v-model="MyGrade"
          show-score
          text-color="#ff9900"
          :score-template="Grade + ''"
          allow-half
          @change="GradeChange"
        >
        </el-rate>
      </div>
    </div>
    <!-- 点赞 收藏 评论-->
    <div class="bottomBox">
      <div class="w">
        <span @click="toMainPage(Article.IssuerId, Article.IssuerName)"
          >作者：{{ Article.IssuerName }}</span
        ><button
          class="followBtn"
          :class="isfollow == 0 ? '' : 'followed'"
          @click="addFollow"
        >
          {{ isfollow == 0 ? "+ 关注" : "已关注" }}
        </button>
      </div>
      <div class="IconRow">
        <span
          class="iconfont icon-dianzan"
          @click="toStarOrLike(1, Liked)"
          :class="Liked ? 'pink' : ''"
        ></span
        >{{ Article.Likes
        }}<span
          class="iconfont icon-shoucang"
          @click="toStarOrLike(2, Star)"
          :class="Star ? 'gold' : ''"
        ></span
        >{{ Article.Stars }}
        <!-- <span class="viewsIcon el-icon-chat-dot-square"> </span>
        {{ Article.Comments }} -->
        <span v-if="Article.Price != 0">
          <span class="iconfont pl20 icon-zhifu"></span>{{ Article.BuyNum }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    // document.title = "资源共享--文章详情";
    this.getArticle();
    this.isFollow();
  },
  data() {
    return {
      Article: {},
      isfollow: 0,
      Liked: false,
      Star: false,
      Grade: 60,
      Note: "",
    };
  },
  props: {
    ArticleInfo: {
      type: Object,
      default: () => {
        return {
          ArticleId: 7,
          IssuerId: 4,
          IssuerName: "98movie",
        };
      },
    },
    ArticleList: {
      type: Array,
    },
  },
  // updated() {
  //   console.log(5555);
  //   // this.getArticle();
  //   // this.isFollow();
  // },
  computed: {
    // Article() {
    //   return this.Article
    // },
    MyGrade: {
      get() {
        let g = this.Grade / 20;
        return g;
      },
      set(g) {
        this.Grade = g * 20;
        // this.Grade = g;
      },
    },
  },
  watch: {
    ts() {
      console.log(1);
    },
  },
  methods: {
    parentHandleclick(e) {
      // console.log(e);
      this.getArticle();
      this.isFollow();
    },
    toTime(time) {
      let t = new Date(time - 0).toLocaleString();
      return t;
    },
    async getArticle() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.get("/my/article/geta", {
        params: {
          ArticleId: this.ArticleInfo.ArticleId,
          BuyerId: userInfo.id,
        },
      });
      console.log(res);
      // alert(res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return this.$message.error(res.meta.message);
      }
      // this.$message.success(res.meta.message);
      this.Article = res.data.Article;
      this.addNote();
      // this.$store.dispatch("saveArticleAys", res.data.Article);
    },
    async isFollow() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.get("/my/userinfo/isfollow", {
        params: {
          FollowerId: userInfo.id,
          WriterId: this.ArticleInfo.IssuerId,
        },
      });
      console.log(res);
      // if (res.meta.status !== 200) {
      //   this.isfollow = 0;
      //   return;
      // }
      this.isfollow = 0;
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return;
        this.$message.error(res.meta.message);
      }
      this.isfollow = 1;
    },
    async addFollow() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      if (userInfo.id == this.ArticleInfo.IssuerId)
        return this.$message.error("不能关注自己");
      const { data: res } = await this.$http.post("/my/userinfo/follow", {
        FollowerId: userInfo.id,
        WriterId: this.ArticleInfo.IssuerId,
        WriterName: this.ArticleInfo.IssuerName,
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
    async addNote() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.post("/my/userinfo/addnote", {
        note: {
          UserId: userInfo.id,
          UserName: userInfo.username,
          WriterId: this.Article.IssuerId,
          WriterName: this.Article.IssuerName,
          ArticleId: this.Article.ArticleId,
          Title: this.Article.Title,
          CateNum: this.Article.CateNum,
          CateName: this.Article.CateName,
          NoteType: 0,
          CreateTime: Date.now() + "",
        },
        Grade: {
          NowGrade: this.Article.Grade,
          VOrBNum: this.Article.Views,
          oldGrade: this.Article.Grade,
          Price: this.Article.Price,
        },
      });
      console.log(res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return this.$message.error(res.meta.message);
      }
      // this.$message.success(res.meta.message);
      this.getNote();
    },
    toMainPage(id, name) {
      // this.$router.replace(`/mainpage?IssuerId=${id}&IssuerName=${name}&t=${Date.now()}`);
      this.$store.commit("saveMainPageData", {
        IssuerId: id,
        IssuerName: name,
      });
      this.$router.push(`/mainpage`);
    },
    buyA(price = 0) {
      this.$confirm(`你确定花费${price}积分兑换该分享吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
          const { data: res } = await this.$http.post("/my/buy/add", {
            SellerId: this.Article.IssuerId,
            SellerName: this.Article.IssuerName,
            BuyerId: userInfo.id,
            BuyerName: userInfo.username,
            ArticleId: this.Article.ArticleId,
            Title: this.Article.Title,
            CreateTime: Date.now() + "",
          });
          console.log(res);
          if (res.meta.status > 301)
            return this.$message.error(res.meta.message);
          if (res.meta.status == 301) {
            return this.$message.error(res.meta.message);
          }
          this.$message.success(res.meta.message);
          this.getArticle();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消兑换",
          });
        });
    },
    async toStarOrLike(type, isPush) {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      let reProp = {};
      // let Liked = this.Liked;
      // let Star = this.Star;
      type == 1 ? (reProp.Liked = !isPush) : (reProp.Star = !isPush);
      const { data: res } = await this.$http.post("/my/userinfo/UpNote", {
        UserId: userInfo.id,
        IssuerId: this.Article.IssuerId,
        ArticleId: this.Article.ArticleId,
        reProp,
        type,
        isPush,
      });
      console.log("toStarOrLike==", res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      type == 1 ? (this.Liked = !isPush) : (this.Star = !isPush);
      type == 1
        ? !isPush == true
          ? this.Article.Likes++
          : this.Article.Likes--
        : !isPush == true
        ? this.Article.Stars++
        : this.Article.Stars--;
    },
    async getNote() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      let params = {
        UserId: userInfo.id,
        ArticleId: this.ArticleInfo.ArticleId,
      };
      console.log(params);
      const { data: res } = await this.$http.get("/my/userinfo/getNote", {
        params,
      });
      console.log("getNote==", res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return this.$message.error(res.meta.message);
      }
      // this.$message.success(res.meta.message);
      this.Liked = res.data.Note.Liked == 0 ? false : true;
      this.Star = res.data.Note.Star == 0 ? false : true;
      this.Note = res.data.Note;
      this.Grade = res.data.Note.Grade;
    },
    async GradeChange() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      let VOrBNum =
        this.Article.Price == 0 ? this.Article.Views : this.Article.BuyNum;
      const { data: res } = await this.$http.post("/my/userinfo/UpNoteGrade", {
        UserId: userInfo.id,
        ArticleId: this.Article.ArticleId,
        MyNewGrade: this.Grade,
        MyOldGrade: this.Note.Grade,
        VOrBNum,
        oldGrade: this.Article.Grade,
      });
      console.log("GradeChange==", res);
      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        return this.$message.error(res.meta.message);
      }
      this.$message.success(res.meta.message);
      this.getArticle();
    },
  },
};
</script>

<style lang="less" >
.ArticleBox {
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 10px 10px 5px #ccc;
  padding: 10px;
  width: 750px;
  h2 {
    margin-top: 0;
  }
  .IssuerBox {
    background-color: #ebebeb;
    padding: 10px;
  }
  .ContentBox {
    img {
      width: 500px;
    }
  }
  .LianjieBox {
    overflow: hidden;
    .BuyBtn {
      float: right;
    }
  }
  .rateBox {
    padding: 10px;
    overflow: hidden;
    .Arate {
      float: left;
      margin-right: 40px;
    }
    .Myrate {
      float: left;
    }
  }
  .bottomBox {
    overflow: hidden;
    margin-top: 10px;
    padding: 10px;
    background-color: #ebebeb;
    font-size: 20px;
    .w {
      float: left;
      .followBtn {
        margin-left: 20px;
        border-radius: 5px;
      }
      .followed {
        background-color: pink;
        border-color: pink;
        color: #fff;
      }
    }
    .IconRow {
      float: right;
      padding: 5px 0;
      .iconfont {
        width: 20px;
        height: 20px;
        padding: 0 10px 0 15px;
        font-size: 20px;
      }
      .viewsIcon {
        padding: 0 10px 0 15px;
      }
      .pink {
        color: pink;
      }
      .gold {
        color: #fca60b;
      }
    }
  }
}
</style>

