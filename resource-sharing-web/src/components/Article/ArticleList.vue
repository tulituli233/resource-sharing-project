<template>
  <div class="ArticleListBox">
    <div v-if="ArticleList.length !== undefined && ArticleList.length !== 0">
      <div
        class="listitem"
        v-for="(item, i) in NewAL"
        :key="i"
        @click="toArticle(item.ArticleId, item.IssuerId, item.IssuerName)"
      >
        <div class="ImgBox">
          <img :src="item.FirstImgUrl" alt="" />
          <el-rate
            :value="item.Grade / 20"
            disabled
            show-score
            text-color="#ff9900"
            :score-template="item.Grade + ''"
          >
          </el-rate>
        </div>
        <div class="articleInfo">
          <div class="IssuerBox">
            <span class="spanName">{{ item.IssuerName }}</span>
          </div>
          <span class="TitleSpan">{{ item.Title }}</span>
          <div class="brief">简介:{{ item.Brief }}</div>
          <div class="TagBox">
            标签:
            <el-tag
              size="mini"
              type="warning"
              class="eltagItem"
              v-for="(item1, i1) in item.Tags"
              :key="i1"
              >{{ item1 }}
            </el-tag>
          </div>
        </div>
        <div class="cateBox">{{ item.CateName }}</div>
        <div class="priceBox" :class="item.Price == 0 ? 'cGreen' : 'cYellow'">
          {{ item.Price == 0 ? "免费" : `$${item.Price}` }}
        </div>
        <el-row class="IconRow"
          ><span class="iconfont icon-dianzan"></span>{{ item.Likes
          }}<span class="viewsIcon el-icon-view"></span>{{ item.Views
          }}<span class="viewsIcon el-icon-chat-dot-square"></span
          >{{ item.Comments }}
          <span v-if="item.Price != 0">
            <span class="iconfont viewsIcon icon-zhifu"></span>{{ item.BuyNum }}
          </span>
        </el-row>
        <span class="spanTime" v-text="toTime(item.CreateTime)"></span>
      </div>
    </div>
    <div v-else class="notDataTips">{{ notDataTips }}</div>
    <!-- <div class="hasSelect" v-if="queryInfo.hasSelect">
      <div :a="inputTopVal" :c="CateVal"></div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "ArticleList",
  props: {
    queryInfo: {
      type: Object,
      default: () => {
        return {
          cate: "",
          mark: "",
          pagenum: 1,
          pagesize: 10,
          hasSelect: false,
        };
      },
    },
    ArticleList: {
      type: Array,
    },
    notDataTips: {
      type: String,
      default: "暂时没有数据！",
    },
  },
  computed: {
    NewAL: {
      get() {
        // console.log('this.ArticleList',this.ArticleList);
        let alists = [];
        if (typeof this.ArticleList[0].Tags == "string") {
          alists = this.ArticleList.map((item) => {
            item.Tags = item.Tags.split(",");
            item.Tags.pop();
            return item;
          });
        }
        // console.log("alists", alists);
        return alists;
      },
    },
  },
  data() {
    return {
      alist: [],
      value: 3.7,
      // queryInfo: {
      //   cate: "",
      //   mark: "",
      //   pagenum: 1,
      //   pagesize: 10,
      // },
      alists: [],
    };
  },
  created() {
    // this.getArticleList();
    // console.log(1);
    // this.$nextTick(() => {
    //   this.alist = this.$store.state.indexArticleList;
    //   console.log(222);
    //   console.log(this.alist);
    // });
    // console.log(111);
    // console.log(this.alist);
  },
  methods: {
    toTime(time) {
      let t = new Date(time - 0).toLocaleString();
      return t;
    },
    async getArticleList() {
      const { data: res } = await this.$http.post(
        "/my/article/alist",
        this.queryInfo
      );
      console.log(res.data.alist);
      this.alists = alists;
      if (res.meta.status !== 200) {
        this.$message.error(res.meta.message);
        return;
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
      this.alists = alists;
      // this.$store.dispatch("indexArticleListAys", res.data.alist);
      // this.$store.commit("indexArticleList", res.data.alist);
      // window.sessionStorage.setItem("token", res.data);
    },
    async toArticle(ArticleId, IssuerId, IssuerName) {
      // this.getArticle(ArticleId);
      let ArticleInfo = {
        ArticleId,
        IssuerId,
        IssuerName,
      };
      // this.getCommentList(ArticleId, IssuerId);
      this.$store.commit("saveArticleInfo", ArticleInfo);
      // this.$store.commit("saveIssuerId", IssuerId);
      this.$router.push("/article");
    },
    async getArticle(ArticleId) {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      const { data: res } = await this.$http.get("/my/article/geta", {
        params: {
          ArticleId: ArticleId,
          BuyerId: userInfo.id,
        },
      });
      console.log(res);
      // alert(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.$message.success(res.meta.message);
      this.$store.dispatch("saveArticleAys", res.data.Article);
    },
    async getCommentList(ArticleId) {
      const { data: res } = await this.$http.get("/my/comment/list", {
        params: {
          ArticleId,
        },
      });
      console.log(res.data.clist);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.$message.success(res.meta.message);
      this.$store.dispatch("saveCommentAys", res.data.clist);
    },
  },
};
</script>

<style lang="less" scoped>
.ArticleListBox {
  // width: 800px;
  border: 1px solid #ccc;
  padding: 10px;
  .listitem {
    position: relative;
    margin-top: 5px;
    overflow: hidden;
    // border-bottom: 1px solid #fff;
    background-color: #fff;
    padding-bottom: 30px !important;
    padding: 10px;
    .ImgBox {
      float: left;
      img {
        width: 140px;
        height: 100px;
      }
    }
    .articleInfo {
      float: left;
      padding-left: 10px;
      .IssuerBox {
        width: 500px;
        overflow: hidden;
        .spanName {
          float: left;
        }
      }
      .TitleSpan {
        margin: 5px;
        font-size: 18px;
        font-weight: 600;
      }
      .brief {
        height: 57px;
        width: 580px;
      }
      .TagBox {
        color: #e6a23c;
        .eltagItem {
          margin-right: 10px;
        }
      }
    }
    .cateBox {
      position: absolute;
      top: 0;
      right: 50px;
      background-color: rgb(61, 197, 247);
      padding: 3px;
    }
    .priceBox {
      position: absolute;
      right: 0;
      top: 0;
      padding: 3px;
    }
    .cGreen {
      background-color: rgb(59, 223, 59);
    }
    .cYellow {
      background-color: #fca60b;
    }
    .IconRow {
      padding: 5px 0 5px 15px;
      position: absolute;
      left: 0;
      bottom: 0;
      .iconfont {
        width: 20px;
        height: 20px;
        padding-right: 10px;
      }
      .pl20 {
        padding-left: 20px;
      }
      .viewsIcon {
        width: 20px;
        height: 20px;
        margin-left: 20px;
        padding-right: 10px;
      }
    }
    .spanTime {
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 5px;
    }
  }
  .notDataTips{
    text-align: center;
  }
}
</style>