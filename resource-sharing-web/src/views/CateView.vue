<template>
  <div class="CateViewBox">
    <!-- <div class="selectBox">
      <div style="margin-top: 15px">
        <el-input
          placeholder="请输入内容"
          v-model="queryInfo.mark"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> 
      </div>
    </div> -->
    <div class="CateViewLeft">
      <div class="CateBox">
        <div class="CateLeft">
          <div class="yijiCate">一级分类：</div>
          <div class="erjiCate">二级分类：</div>
        </div>
        <div class="CateRight" ref="c1">
          <div
            class="CateItem"
            v-for="(item, i) in this.$store.state.CateList"
            :key="i"
            @click="erjiCate(item.value, item.label)"
          >
            <div class="yijiCate">
              {{ item.label }}
            </div>
            <div class="erjiCateBox" :class="i == 0 ? 'erjiCate1' : ''">
              <div
                class="erjiCate"
                v-for="(item1, i1) in item.children"
                :key="i1"
                @click.stop="erjiCate(item1.value, item1.label)"
              >
                {{ item1.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="midCateBox">分类：{{ selectName }}</div>
      <div v-if="ArticleList.length">
        <ArticleList :ArticleList="ArticleList"></ArticleList>
      </div>
      <div class="noDataBox" v-else>
        <!-- 暂时没有关于<span style="color: red">{{ queryInfo.mark}}</span
        >的文章 -->
        这里还什么都没有呢~
      </div>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="ArticleList.length"
      >
      </el-pagination>
      <div :m="markstr"></div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    document.title = "资源共享--分类";
    this.getArticleList();
    // let inpVal = this.$route.query.inpVal;
    // this.queryInfo.mark = inpVal == undefined ? "" : inpVal;
    // console.log(inpVal);
  },
  data() {
    return {
      queryInfo: {
        cate: "",
        mark: "",
        pagenum: 1,
        pagesize: 5,
        hasSelect: true,
      },
      ArticleList: [],
      selectName: "全部",
    };
  },
  computed: {
    markstr() {
      let inpVal = this.$route.query.inpVal;
      let mark = inpVal == undefined ? "" : inpVal;
      console.log(inpVal);
      if (inpVal !== undefined) {
        this.queryInfo.cate = "";
        // this.selectName = "全部";
        this.queryInfo.mark = mark;
      } else {
      }
      // console.log(queryInfo);
      this.getArticleList();
      // console.log(21);
      // this.queryInfo=queryInfo;
      return mark;
    },
  },
  methods: {
    erjiCate(CateNum, CateName) {
      this.queryInfo.cate = CateNum;
      this.selectName = CateName;
      // this.getArticleList();
    },
    async getArticleList() {
      const { data: res } = await this.$http.post(
        "/my/article/alist",
        this.queryInfo
      );

      if (res.meta.status > 301) return this.$message.error(res.meta.message);
      if (res.meta.status == 301) {
        this.ArticleList = [];
        return;
        this.$message.error(res.meta.message);
      }
      // this.$message.success(res.meta.message);
      console.log(res.data.alist);
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
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getArticleList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getArticleList();
    },
  },
};
</script>

<style lang="less" scoped>
.CateViewBox {
  .CateViewLeft {
    width: 800px;
    // background-color: #fff;
    .yijiCate {
      padding-bottom: 20px;
      padding-top: 5px;
    }
    .CateBox {
      overflow: hidden;
      background-color: #fff;
      padding: 10px;
      .CateLeft {
        float: left;
      }
      .CateRight {
        float: left;
        position: relative;
        height: 80px;
        width: 400px;
        .CateItem {
          float: left;
          .yijiCate {
            padding: 5px;
            border: 1px solid rgb(43, 173, 243);
            border-radius: 5px;
            margin-right: 5px;
          }
          &:hover .yijiCate {
            border: 1px solid red;
          }
          &:hover .erjiCateBox {
            display: block;
            z-index: 10;
          }
          // &:hover .erjiCate1 {
          //   display: none;
          // }
          // &:focus .erjiCateBox {
          //   display: block;
          // }

          .erjiCateBox {
            position: absolute;
            display: none;
            left: 0;
            top: 15;
            width: 400px;
            height: 40px;
            padding: 10px 0;
            background-color: #fff;
            .erjiCate {
              float: left;
              padding: 5px;
              border: 1px solid rgb(54, 255, 121);
              border-radius: 5px;
              margin-right: 5px;
              // display: block;
              &:hover {
                border: 1px solid yellow;
              }
            }
          }
          .erjiCate1 {
            display: block;
          }
        }
      }
    }
  }
  .midCateBox {
    padding: 10px;
  }
  .noDataBox {
    width: 800px;
    border: 1px solid #ccc;
    padding: 10px;
    text-align-last: center;
  }
}
</style>