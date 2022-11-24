<template>
  <div class="commentBox">
    <div class="pingLunBox">
      <el-input
        type="textarea"
        ref="commentInp"
        :rows="3"
        :placeholder="CommentInfo.placeholder"
        v-model="CommentInfo.CommentContent"
      ></el-input>
      <el-row style="padding: 10px">
        <el-button
          class="toCommentBtn"
          type="success"
          @click="toComment"
          size="mini"
          v-show="CommentInfo.CommentType"
          >切回评论</el-button
        >
        <span style="padding-right: 20px">还能输入{{ CNum }}个字符</span>
        <el-button type="primary" @click="addComment()" size="mini">{{
          CommentInfo.btnStr
        }}</el-button>
      </el-row>
    </div>
    <div class="commentItem" v-for="item in Comment" :key="item.CommentId">
      <div class="nameAndTime">
        <span>{{ item.FromName }}</span>
        <div class="UpBox">
          <span>点赞</span><br /><span>{{ item.Likes }}</span>
        </div>
        <div class="huifuBtn">
          <button @click="toHuifu(item.FromId, item.FromName, item.CommentId)">
            <span>X</span>回复
          </button>
        </div>
        <br />
        <span class="spanTime" v-text="toTime(item.CreateTime)"></span>
      </div>
      <div class="CommentContent">
        {{ item.CommentContent }}
      </div>
      <div class="huifuBox" v-if="item.clist">
        <div
          class="huifuItem"
          v-for="item1 in item.clist"
          :key="item1.CommentId"
        >
          <div class="nameAndTime">
            <span>{{ item1.FromName }}</span>
            <span>&nbsp;&nbsp;回复：{{item1.ToName}}</span>
            <div class="UpBox">
              <span>点赞</span><br /><span>{{ item1.Likes }}</span>
            </div>
            <div class="huifuBtn">
              <button
                @click="toHuifu(item1.FromId, item1.FromName, item.CommentId)"
              >
                <span>X</span>回复
              </button>
            </div>
            <br />
            <span class="spanTime" v-text="toTime(item1.CreateTime)"></span>
          </div>
          <div class="CommentContent">
            {{ item1.CommentContent }}
          </div>
          <!-- <div>
            <span class="blueName">{{ item.FromName }}&nbsp;:&nbsp;</span>
            <span>{{ item1.CommentContent }}</span>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Comment: {},
      CommentInfo: {
        CommentContent: "",
        ToId: "",
        ToName: "",
        CommentType: 0,
        btnStr: "评论",
        placeholder: "欢迎高质量的评论，低质的评论会被折叠",
        OnId: 1,
      },
    };
  },
  created() {
    // document.title = "资源共享--文章详情";
    this.getCommentList();
  },
  computed: {
    // Comment() {
    //   return this.$store.state.Comment;
    // },
    CNum() {
      return 255 - this.CommentInfo.CommentContent.length;
    },
  },
  methods: {
    toTime(time) {
      let t = new Date(0 - time).toLocaleString();
      // console.log(t);
      // console.log(new Date(0 - time).toLocaleString());
      return t;
    },
    async addComment() {
      let userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
      let comment = {
        ArticleId: this.$store.state.ArticleInfo.ArticleId,
        FromId: userInfo.id,
        ToId: this.CommentInfo.ToId,
        CommentContent: this.CommentInfo.CommentContent,
        CommentType: this.CommentInfo.CommentType,
        OnId: this.CommentInfo.OnId,
        FromName: userInfo.username,
        ToName: this.CommentInfo.ToName,
        CreateTime: Date.now() + "",
      };
      console.log(comment);
      const { data: res } = await this.$http.post("/my/comment/add", comment);
      //   console.log(res);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.$message.success(res.meta.message);
      this.CommentInfo.CommentContent = "";
      this.getCommentList();
    },
    toHuifu(ToId, ToName, CommentId) {
      this.CommentInfo.CommentType = 1;
      this.CommentInfo.btnStr = "回复";
      this.CommentInfo.ToId = ToId;
      this.CommentInfo.ToName = ToName;
      this.CommentInfo.OnId = CommentId;
      this.CommentInfo.placeholder = `回复 : ${ToName}`;
      this.$refs.commentInp.focus();
      console.log(1);
    },
    toComment() {
      let ArticleInfo = this.$store.state.ArticleInfo;
      this.CommentInfo.CommentType = 0;
      this.CommentInfo.btnStr = "评论";
      this.CommentInfo.ToId = ArticleInfo.IssuerId;
      this.CommentInfo.OnId = ArticleInfo.IssuerId;
      this.CommentInfo.ToName = ArticleInfo.IssuerName;
      this.CommentInfo.placeholder = `欢迎高质量的评论，低质的评论会被折叠`;
      this.$refs.commentInp.focus();
      console.log(1);
    },
    async getCommentList() {
      let ArticleId = this.$store.state.ArticleInfo.ArticleId;
      const { data: res } = await this.$http.get("/my/comment/list", {
        params: {
          ArticleId,
        },
      });
      console.log(res.data.clist);
      if (res.meta.status !== 200) return this.$message.error(res.meta.message);
      this.$message.success(res.meta.message);
      this.Comment = res.data.clist;
      this.toComment();
      // this.$store.commit("saveComment", res.data.clist);
    },
  },
};
</script>

<style lang="less" scoped>
.commentBox {
  width: 750px;
  padding: 10px;
  box-shadow: 10px 10px 5px #ccc;
  .commentItem {
    // width: 100%;
    padding: 10px;
    border-bottom: 1px solid #666;
    .nameAndTime {
      &:hover .huifuBtn {
        width: 50px;
        height: 21px;
      }
      color: #888;
      .spanTime {
        font-size: 10px;
      }
      .UpBox {
        float: right;
        text-align: center;
      }
      .huifuBtn {
        width: 0;
        height: 0;
        overflow: hidden;
        float: right;
        padding-right: 20px;
        button {
          border: none;
          font-size: 14px;
        }
      }
    }
    .CommentContent {
      padding: 10px 0;
    }
    .huifuBox {
      width: 92%;
      padding: 10px;
      background: #ddd;
      margin-left: 20px;
      .huifuItem {
        border-bottom: 1px #fff solid;
        margin-bottom: 10px;
        .blueName {
          color: blue;
        }
      }
    }
  }
  .pingLunBox {
    width: 100%;
    text-align: right;
    .toCommentBtn {
      float: left;
    }
  }
}
</style>